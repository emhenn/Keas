﻿using System;
using System.Collections.Generic;
using System.Text;
using Keas.Core.Domain;
using TestHelpers.Helpers;
using Xunit;

namespace Test.TestsDatabase
{
    [Trait("Category","DatabaseTests")]
    public class AssetBaseTests
    {
        #region Reflection of Database

        [Fact]
        public void TestDatabaseFieldAttributes()
        {
            #region Arrange
            var expectedFields = new List<NameAndType>();
            expectedFields.Add(new NameAndType("Active", "System.Boolean", new List<string>()));
            expectedFields.Add(new NameAndType("Group", "System.String", new List<string>
            {
                "[System.ComponentModel.DataAnnotations.StringLengthAttribute((Int32)32)]",
            }));
            expectedFields.Add(new NameAndType("Id", "System.Int32", new List<string>
            {
                "[System.ComponentModel.DataAnnotations.KeyAttribute()]",
            }));
            expectedFields.Add(new NameAndType("Name", "System.String", new List<string>
            {
                "[System.ComponentModel.DataAnnotations.RequiredAttribute()]",
                "[System.ComponentModel.DataAnnotations.StringLengthAttribute((Int32)64)]",
            }));
            expectedFields.Add(new NameAndType("Tags", "System.String", new List<string>()));
            expectedFields.Add(new NameAndType("Team", "Keas.Core.Domain.Team", new List<string>()));
            expectedFields.Add(new NameAndType("TeamId", "System.Int32", new List<string>()));
            
            #endregion Arrange

            AttributeAndFieldValidation.ValidateFieldsAndAttributes(expectedFields, typeof(AssetBase));
        }

        #endregion Reflection of Database
    }
}
