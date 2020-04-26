using ElectricityUseReportService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace ElectricityUseReportService.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class DataAPIController : ApiController
    {

        // GET: api/DataAPI
        public Dictionary<string, List<String>> Get()
        {
            using (eurdbEntities db = new eurdbEntities())
            {
                Dictionary<String, List<String>> response = new Dictionary<String, List<String>>();
                DateTime startDate = DateTime.Parse("2018-01-01 00:00:00.000");
                DateTime endDate = DateTime.Parse("2018-01-01 23:59:00.000");

                List<tblReading> readins = db.tblReadings.Where(x => x.BuildingId == 1 && x.DatafieldId == 1 && x.Timestamp >= startDate && x.Timestamp <= endDate).ToList();
                double dayDiff = (endDate - startDate).TotalDays;
                response.Add("datetime", readins.Select(a => a.Timestamp.ToString("HH:mm")).ToList());
                response.Add("value", readins.Select(a => a.Value.ToString()).ToList());
                return response;
            }
        }

        [Route("api/DataAPI/data")]
        [HttpPost]
        public Dictionary<string, List<String>> Get(RequestModel request)
        {
            using (eurdbEntities db = new eurdbEntities())
            {
                db.Database.CommandTimeout = 180;
                Dictionary<String, List<String>> response = new Dictionary<String, List<String>>();
                DateTime startDate = DateTime.Parse("2018-01-01 00:00:00.000");
                if (request.startDate != null)
                {
                    startDate = request.startDate;
                }
                DateTime endDate = DateTime.Parse("2018-01-01 23:59:00.000");
                if (request.endDate != null)
                {
                    endDate = request.endDate;
                }
                List<tblReading> readings = new List<tblReading>();
                if (request.buildingId != 0 && request.objectId != 0 && request.datafieldId != 0)
                {
                    readings = db.tblReadings.Where(x => x.BuildingId == request.buildingId && x.ObjectId == request.objectId && x.DatafieldId == request.datafieldId && (x.Timestamp >= startDate && x.Timestamp <= endDate)).ToList();
                }
                else
                {
                    readings = db.tblReadings.Where(x => x.BuildingId == request.buildingId && x.DatafieldId == request.datafieldId && (x.Timestamp >= startDate && x.Timestamp <= endDate)).ToList();
                }

                // List<tblReading> readins = db.tblReadings.Where(x => x.BuildingId == 1 && x.DatafieldId == 1 && x.Timestamp >= startDate && x.Timestamp <= endDate).ToList();
                double dayDiff = (endDate - startDate).TotalDays;
                response.Add("datetime", readings.Select(a => a.Timestamp.ToString("HH:mm")).ToList());
                response.Add("value", readings.Select(a => a.Value.ToString()).ToList());
                return response;
            }
        }

        [ResponseType(typeof(void))]
        [Route("api/DataAPI/building")]
        [HttpGet]
        public List<tblBuilding> GetBuilding()
        {
            List<tblBuilding> list;
            using (eurdbEntities db = new eurdbEntities())
            {
                list = db.tblBuildings.ToList();
            }
            return list;
        }

        [ResponseType(typeof(void))]
        [Route("api/DataAPI/object")]
        [HttpGet]
        public List<tblObject> GetObject()
        {
            List<tblObject> list;
            using (eurdbEntities db = new eurdbEntities())
            {
                list = db.tblObjects.ToList();
            }
            return list;
        }

        [ResponseType(typeof(void))]
        [Route("api/DataAPI/datafield")]
        [HttpGet]
        public List<tblDataField> GetDataField()
        {
            List<tblDataField> list;
            using (eurdbEntities db = new eurdbEntities())
            {
                list = db.tblDataFields.ToList();
            }
            return list;
        }

    }
}
