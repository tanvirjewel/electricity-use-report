using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ElectricityUseReportService.Models
{
    public class RequestModel
    {
        public int buildingId { get; set; }
        public int objectId { get; set; }
        public int datafieldId { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

    }
}