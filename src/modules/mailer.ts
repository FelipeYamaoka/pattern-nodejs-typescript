// import * as path from 'path';
import * as nodemailer from 'nodemailer';
// import hbs from 'nodemailer-express-handlebars';

import { host, port, user, pass } from '../config/mail.json';

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});


// transport.use('compile', hbs({
//   viewEngine: {
//     partialsDir: path.join(__dirname, '../resources/mail/auth/'),
//     layoutsDir: path.join(__dirname, '../resources/mail/auth/'),
//     defaultLayout: ''
//   },
//   viewPath: path.join(__dirname, '../resources/mail/auth/'),
//   extName: '.html'
// }));

export default transport;
