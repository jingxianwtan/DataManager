using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using MySql.Data.MySqlClient;

namespace ConsoleApp1
{
    public class DAOImp : DataAccessObject
    {
        static string connectionString =
            "SERVER = localhost; DATABASE = test_data; UID = root; PWD = 1221";
        static MySqlConnection conn = new MySqlConnection(connectionString);
        
        public List<Node> GetAllParentCategories()
        {
            List<Node> result = new List<Node>();

            try
            {
                conn.Open();
                string sql = "SELECT * FROM parent_category";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    result.Add(new Node(dr["parent_category_id"].ToString(), dr["name"].ToString(), "1"));
                }

                dr.Close();
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
            }
            finally
            {
                conn.Close();
            }
            return result;
        }

        public List<Node> GetAllCategories()
        {
            List<Node> result = new List<Node>();
            try
            {
                conn.Open();
                string sql = "SELECT * FROM category";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader dr = cmd.ExecuteReader();
            
                while (dr.Read())
                {
                    result.Add(new Node(dr["category_id"].ToString(), dr["name"].ToString(), dr["parent_cat_id"].ToString()));
                }
                dr.Close();
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
            }
            finally
            {
                conn.Close();
            }
            return result;
        }

        public List<Event> GetAllEvents()
        {
            List<Event> result = new List<Event>();
            try
            {
                conn.Open();
                string sql = "SELECT * FROM event";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader dr = cmd.ExecuteReader();
            
                while (dr.Read())
                {
                    result.Add(new Event(dr["event_id"].ToString(), dr["category_id"].ToString(), dr["event_time"].ToString(), dr["location"].ToString(), dr["event_name"].ToString(), dr["team"].ToString()));
                }
                dr.Close();
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
            }
            finally
            {
                conn.Close();
            }
            return result;
        }

        public List<Listing> GetAllListings()
        {
            List<Listing> result = new List<Listing>();
            try
            {
                conn.Open();
                string sql = "SELECT * FROM listing";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader dr = cmd.ExecuteReader();
            
                while (dr.Read())
                {
                    result.Add(new Listing(dr["listing_id"].ToString(), dr["user_id"].ToString(), dr["event_id"].ToString(), dr["created_time"].ToString(), dr.GetDouble("price"), dr.GetInt32("quantity")));
                }
                dr.Close();
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
            }
            finally
            {
                conn.Close();
            }
            return result;
        }
        
        public List<Transactions> GetAllTransactions()
        {
            List<Transactions> result = new List<Transactions>();
            try
            {
                conn.Open();
                string sql = "SELECT * FROM transaction";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    result.Add(new Transactions(dr["transaction_id"].ToString(), dr["buyer_id"].ToString(),
                         dr["payment_id"].ToString(), dr["listing_id"].ToString(),dr.GetInt32("quant_bought"),
                        dr["seller_id"].ToString(), dr["date"].ToString()));
                }

                dr.Close();
            }
            catch (Exception exception)
            {
                Console.Write(exception.Message);
            }
            finally
            {
                conn.Close();
            }

            return result;
        }
    }
}