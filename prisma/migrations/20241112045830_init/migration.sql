-- CreateTable
CREATE TABLE "FormData" (
    "id" TEXT NOT NULL,
    "formData" TEXT NOT NULL,
    "template" INTEGER NOT NULL,
    "filename" TEXT,

    CONSTRAINT "FormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFormSubmission" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "filename" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserFormSubmission_user_id_idx" ON "UserFormSubmission"("user_id");

-- AddForeignKey
ALTER TABLE "UserFormSubmission" ADD CONSTRAINT "UserFormSubmission_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "FormData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
