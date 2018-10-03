﻿CREATE TABLE [dbo].[Bldg] (
    [Bldg_Key]             VARCHAR (150)  NULL,
    [Official_Name]        VARCHAR (300)  NULL,
    [Primary_Display_Name] VARCHAR (300)  NULL,
    [Asset_Number]         VARCHAR (150)  NULL,
    [Facilities_Code]      VARCHAR (150)  NULL,
    [UCDHS_Bldg_Num]       VARCHAR (150)  NULL,
    [Location]             VARCHAR (150)  NULL,
    [Affiliation]          VARCHAR (150)  NULL,
    [Category]             VARCHAR (150)  NULL,
    [Primary_Usage]        VARCHAR (300)  NULL,
    [Address]              VARCHAR (150)  NULL,
    [City]                 VARCHAR (150)  NULL,
    [County]               VARCHAR (150)  NULL,
    [State]                VARCHAR (150)  NULL,
    [ZIP]                  VARCHAR (150)  NULL,
    [Country_Code]         VARCHAR (150)  NULL,
    [Address_Code]         VARCHAR (150)  NULL,
    [Occupied]             VARCHAR (150)  NULL,
    [Thumb]                VARCHAR (150)  NULL,
    [Cover]                VARCHAR (MAX)  NULL,
    [CIFS_Thumb]           VARCHAR (MAX)  NULL,
    [CIFS_Cover]           VARCHAR (MAX)  NULL,
    [CEFA_Name]            VARCHAR (150)  NULL,
    [Floors]               INT            NULL,
    [Space_Count]          INT            NULL,
    [Constructed]          VARCHAR (150)  NULL,
    [Renovated]            VARCHAR (150)  NULL,
    [Vacated]              VARCHAR (150)  NULL,
    [Demolished]           VARCHAR (150)  NULL,
    [Last_Reviewed]        VARCHAR (150)  NULL,
    [Latitude]             REAL           NULL,
    [Longitude]            REAL           NULL,
    [Google_Maps_URL]      VARCHAR (MAX)  NULL,
    [CIFS_kml_lonlat]      VARCHAR (1024) NULL
);

