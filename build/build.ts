import qiniu from 'qiniu';
import type { conf, auth, form_up, rs } from 'qiniu';
import * as fs from 'fs';
import * as path from 'path';
import { exit } from 'process';
import { projectBasePath, baseConfig, cdnConfig } from './config';

const mac: auth.digest.Mac = new qiniu.auth.digest.Mac(
  cdnConfig.ak,
  cdnConfig.sk
);

const config: conf.ConfigOptions = new qiniu.conf.Config();
config.zone = qiniu.zone[`Zone_${cdnConfig.zone}`];

/**
 * 上传文件
 * @param key key
 * @param file 文件
 */
const doUpload = async (key: string | null, file: string) => {
  const options: rs.PutPolicyOptions = {
    scope: `${cdnConfig.bucket}:${key}`
  };
  const formUploader: form_up.FormUploader = new qiniu.form_up.FormUploader(
    config
  );
  const putExtra: form_up.PutExtra = new qiniu.form_up.PutExtra();
  const putPolicy: rs.PutPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken: string = putPolicy.uploadToken(mac);
  return new Promise((resolve, reject) => {
    formUploader.putFile(
      uploadToken,
      key,
      file,
      putExtra,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err?: Error, body?: any, info?: any) => {
        if (err) {
          return reject(err);
        }
        if (info.statusCode === 200) {
          resolve(body);
        } else {
          reject(body);
        }
      }
    );
  });
};

/**
 * 上传文件
 * @param dir 文件夹
 * @param prefix 前缀
 */
const uploadAll = (dir: string, prefix?: string) => {
  const files: string[] = fs.readdirSync(dir);
  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const key: string = prefix ? `${prefix}/${file}` : file;
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key);
    }
    doUpload(projectBasePath + key, filePath)
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err));
  });
};

uploadAll(path.join(__dirname, baseConfig.output));

try {
  const data = fs.readFileSync(
    `${path.join(__dirname, baseConfig.output)}/${baseConfig.index}`,
    'utf8'
  );
  fs.writeFileSync(path.join(__dirname, baseConfig.indexOut), data);
  // fs.writeFileSync(path.join(__dirname, baseConfig.indexOut), indexString)
  //文件写入成功。
  console.log('文件写入成功');
} catch (err) {
  console.error(err);
  exit();
}
