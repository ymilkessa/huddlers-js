import dotenv from 'dotenv';

export const testPubkeyReal =
  '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2';

export const testPubkeyFake =
  '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a3';

dotenv.config();

export const testUrl = process.env.TEST_HUDDLERS_URL || '';
