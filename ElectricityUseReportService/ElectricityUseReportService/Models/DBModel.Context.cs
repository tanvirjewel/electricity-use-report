﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ElectricityUseReportService.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class eurdbEntities : DbContext
    {
        public eurdbEntities()
            : base("name=eurdbEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tblBuilding> tblBuildings { get; set; }
        public virtual DbSet<tblDataField> tblDataFields { get; set; }
        public virtual DbSet<tblObject> tblObjects { get; set; }
        public virtual DbSet<tblReading> tblReadings { get; set; }
    }
}
