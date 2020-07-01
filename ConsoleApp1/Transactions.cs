namespace ConsoleApp1
{
    public class Transactions
    {
        public string transactionId { get; set; }
        public string buyerId { get; set; }
        public string paymentId { get; set; }
        public string listingId { get; set; }
        public int quantityBought { get; set; }
        public string sellerId { get; set; }
        public string date { get; set; }

        public Transactions(string transactionId, string buyerId, string paymentId, string listingId,
            int quantityBought, string sellerId, string date)
        {
            this.transactionId = transactionId;
            this.buyerId = buyerId;
            this.paymentId = paymentId;
            this.listingId = listingId;
            this.quantityBought = quantityBought;
            this.sellerId = sellerId;
            this.date = date;
        }
    }
}