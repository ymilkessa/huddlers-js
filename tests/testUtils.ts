import dotenv from 'dotenv';

export const testPubkeyReal =
  '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2';

export const testPubkeyFake =
  '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a3';

export const ThreadTestEvs = {
  rootEventId:
    '7edc1dc69c952b647849db337f2a83fbf719b54bdfbe18b73214c2f341468a6f',
  layer1Comment:
    'd1501a8a88921e36828fb7608a5e10f54b6e6c3673c675e1a0d11055b787f461',
  layer2Comment:
    '86cfa17562b1c4f380be3bba46679fa1ae5a1fb7e33cd71348a1ba8053aad8c7',
  layer3Comment:
    'ad1d94811b95103b4020cf2f3be29c666029553924de6b748885bda72f5ffed9',
};

export const fakeEvId =
  '7edc1dc69c952b647849db337f2a83fbf719b54bdfbe18b73214c2f341468a6e';

dotenv.config();

export const testUrl = process.env.TEST_HUDDLERS_URL || '';
