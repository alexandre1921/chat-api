import * as jwt from 'jsonwebtoken';

const token = jwt.sign({ foo: 'bar' }, 'seu_seguro_jwt', { expiresIn: '1h' });

console.log('Generated token:', token);
