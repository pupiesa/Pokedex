-- Add unique constraint to name field
ALTER TABLE `User` ADD UNIQUE INDEX `User_name_key`(`name`);