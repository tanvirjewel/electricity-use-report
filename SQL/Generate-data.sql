
-- TRUNCATE and Insert data to Building Table
TRUNCATE TABLE [dbo].[tblBuilding];
DECLARE @counter INT = 1;
SET IDENTITY_INSERT [dbo].[tblBuilding] ON;
WHILE @counter <= 100
BEGIN
    INSERT INTO [dbo].[tblBuilding]
           ([Id]
		   ,[Name]
           ,[Location])
     VALUES
           (
			@counter
			,('Building - ' + CAST(@counter AS VARCHAR(5)))
			,('Location - ' + CAST(@counter AS VARCHAR(5)))
		   );
    SET @counter = @counter + 1;
END
SET IDENTITY_INSERT [dbo].[tblBuilding] OFF;

GO
-- TRUNCATE and Insert data to DataField Table
TRUNCATE TABLE [dbo].[tblDataField];
DECLARE @counter INT = 1;
SET IDENTITY_INSERT [dbo].[tblDataField] ON;
WHILE @counter <= 10
BEGIN
    INSERT INTO [dbo].[tblDataField]
           ([Id]
		   ,[Name]
           )
     VALUES
           (
			@counter
			,('DataField - ' + CAST(@counter AS VARCHAR(5)))
		   );
    SET @counter = @counter + 1;
END
SET IDENTITY_INSERT [dbo].[tblDataField] OFF;

GO
-- TRUNCATE and Insert data to Object Table
TRUNCATE TABLE [dbo].[tblObject];
DECLARE @counter INT = 1;
SET IDENTITY_INSERT [dbo].[tblObject] ON;
WHILE @counter <= 10
BEGIN
    INSERT INTO [dbo].[tblObject]
           ([Id]
		   ,[Name]
           )
     VALUES
           (
			@counter
			,('Object - ' + CAST(@counter AS VARCHAR(5)))
		   );
    SET @counter = @counter + 1;
END
SET IDENTITY_INSERT [dbo].[tblObject] OFF;


GO

-- TRUNCATE and Insert data to Reading Table
TRUNCATE TABLE [dbo].[tblReading];
-- Add date range, the longer you add more time it will take

DECLARE @counter INT = 1;

WHILE @counter <= 100
BEGIN

	DECLARE @StartTime DATETIME = '2018-01-01 00:00:00'
		   ,@EndTime   DATETIME = '2018-01-01 23:59:00'

	WHILE DATEDIFF(MINUTE,@StartTime, @EndTime) >= 0
	BEGIN

	INSERT INTO [dbo].[tblReading] ([BuildingId], [ObjectId], [DatafieldId], [Value], [Timestamp]) VALUES ( 1, (SELECT FLOOR(RAND()*(10-1+1)+1)), 1, (SELECT RAND()*(22-5)+5), @StartTime)
	INSERT INTO [dbo].[tblReading] ([BuildingId], [ObjectId], [DatafieldId], [Value], [Timestamp]) VALUES ( 1, (SELECT FLOOR(RAND()*(10-1+1)+1)), 2, (SELECT RAND()*(22-5)+5), @StartTime)
	INSERT INTO [dbo].[tblReading] ([BuildingId], [ObjectId], [DatafieldId], [Value], [Timestamp]) VALUES ( 1, (SELECT FLOOR(RAND()*(10-1+1)+1)), 3, (SELECT RAND()*(22-5)+5), @StartTime)
	INSERT INTO [dbo].[tblReading] ([BuildingId], [ObjectId], [DatafieldId], [Value], [Timestamp]) VALUES ( 1, (SELECT FLOOR(RAND()*(10-1+1)+1)), 4, (SELECT RAND()*(22-5)+5), @StartTime)
	INSERT INTO [dbo].[tblReading] ([BuildingId], [ObjectId], [DatafieldId], [Value], [Timestamp]) VALUES ( 1, (SELECT FLOOR(RAND()*(10-1+1)+1)), 5, (SELECT RAND()*(22-5)+5), @StartTime)
	INSERT INTO [dbo].[tblReading] ([BuildingId], [ObjectId], [DatafieldId], [Value], [Timestamp]) VALUES ( 1, (SELECT FLOOR(RAND()*(10-1+1)+1)), 6, (SELECT RAND()*(22-5)+5), @StartTime)
	INSERT INTO [dbo].[tblReading] ([BuildingId], [ObjectId], [DatafieldId], [Value], [Timestamp]) VALUES ( 1, (SELECT FLOOR(RAND()*(10-1+1)+1)), 7, (SELECT RAND()*(22-5)+5), @StartTime)
	INSERT INTO [dbo].[tblReading] ([BuildingId], [ObjectId], [DatafieldId], [Value], [Timestamp]) VALUES ( 1, (SELECT FLOOR(RAND()*(10-1+1)+1)), 8, (SELECT RAND()*(22-5)+5), @StartTime)
	INSERT INTO [dbo].[tblReading] ([BuildingId], [ObjectId], [DatafieldId], [Value], [Timestamp]) VALUES ( 1, (SELECT FLOOR(RAND()*(10-1+1)+1)), 9, (SELECT RAND()*(22-5)+5), @StartTime)
	INSERT INTO [dbo].[tblReading] ([BuildingId], [ObjectId], [DatafieldId], [Value], [Timestamp]) VALUES ( 1, (SELECT FLOOR(RAND()*(10-1+1)+1)), 10, (SELECT RAND()*(22-5)+5), @StartTime)

	-- Add 1 minute
	SET @StartTime = DATEADD(MINUTE, 1, @StartTime);

	END

	SET @counter = @counter + 1;

END

GO