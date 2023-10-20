-- CreateEnum
CREATE TYPE "PostCategoryType" AS ENUM ('FREE', 'ASK', 'FLEX', 'REVIEW', 'SHARING');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "PostCategoryType" NOT NULL DEFAULT 'FREE';
