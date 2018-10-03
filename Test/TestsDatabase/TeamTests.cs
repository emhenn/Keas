﻿using System;
using System.Collections.Generic;
using System.Text;
using Keas.Core.Domain;
using TestHelpers.Helpers;
using Xunit;

namespace Test.TestsDatabase
{
    [Trait("Category","DatabaseTests")]
    public class TeamTests
    {
        #region Reflection of Database

        [Fact]
        public void TestDatabaseFieldAttributes()
        {
            #region Arrange
            var expectedFields = new List<NameAndType>();
            expectedFields.Add(new NameAndType("FISOrgs", "System.Collections.Generic.List`1[Keas.Core.Domain.FinancialOrganization]", new List<string>()));
            expectedFields.Add(new NameAndType("Id", "System.Int32", new List<string>
            {
                "[System.ComponentModel.DataAnnotations.KeyAttribute()]",
            }));
            expectedFields.Add(new NameAndType("Name", "System.String", new List<string>
            {
                "[System.ComponentModel.DataAnnotations.DisplayAttribute(Name = \"Team Name\")]",
                "[System.ComponentModel.DataAnnotations.RequiredAttribute()]",
                "[System.ComponentModel.DataAnnotations.StringLengthAttribute((Int32)128)]",
            }));
            expectedFields.Add(new NameAndType("People", "System.Collections.Generic.List`1[Keas.Core.Domain.Person]", new List<string>()));
            expectedFields.Add(new NameAndType("Slug", "System.String", new List<string>
            {
                "[System.ComponentModel.DataAnnotations.DisplayAttribute(Name = \"Team Slug\")]",
                "[System.ComponentModel.DataAnnotations.RegularExpressionAttribute(\"^([a-z0-9]+[a-z0-9\\-]?)+[a-z0-9]$\", ErrorMessage = \"Slug may only contain lowercase alphanumeric characters or single hyphens, and cannot begin or end with a hyphen\")]",
                "[System.ComponentModel.DataAnnotations.RequiredAttribute()]",
                "[System.ComponentModel.DataAnnotations.StringLengthAttribute((Int32)40, MinimumLength = 3, ErrorMessage = \"Slug must be between 3 and 40 characters\")]",
            }));
            expectedFields.Add(new NameAndType("TeamPermissions", "System.Collections.Generic.ICollection`1[Keas.Core.Domain.TeamPermission]", new List<string>
            {
                "[Newtonsoft.Json.JsonIgnoreAttribute()]",
            }));
            #endregion Arrange

            AttributeAndFieldValidation.ValidateFieldsAndAttributes(expectedFields, typeof(Team));
        }

        #endregion Reflection of Database
    }
}
