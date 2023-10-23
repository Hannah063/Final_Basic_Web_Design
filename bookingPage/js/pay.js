function payment() {
    if (request.method === 'POST') {
        // Process input data and build URL payment
        let formData = new FormData($('#payment-form')[0]);
        if (formData) {
            let orderType = formData.get('order_type');
            let orderId = formData.get('order_id');
            let amount = formData.get('amount');
            let orderDesc = formData.get('order_desc');
            let bankCode = formData.get('bank_code');
            let language = formData.get('language');
            let ipaddr = getClientIP();

            // Build URL Payment
            let vnp = new VNPay();
            vnp.requestData.vnp_Version = '2.1.0';
            vnp.requestData.vnp_Command = 'pay';
            vnp.requestData.vnp_TmnCode = VNPAY_TMN_CODE;
            vnp.requestData.vnp_Amount = amount * 100;
            vnp.requestData.vnp_CurrCode = 'VND';
            vnp.requestData.vnp_TxnRef = orderId;
            vnp.requestData.vnp_OrderInfo = orderDesc;
            vnp.requestData.vnp_OrderType = orderType;

            // Check language, default: vn
            if (language && language !== '') {
                vnp.requestData.vnp_Locale = language;
            } else {
                vnp.requestData.vnp_Locale = 'vn';
            }

            // Check bank_code, if bank_code is empty, customer will select a bank on VNPay
            if (bankCode && bankCode !== "") {
                vnp.requestData.vnp_BankCode = bankCode;
            }

            vnp.requestData.vnp_CreateDate = getCurrentDateTime();
            vnp.requestData.vnp_IpAddr = ipaddr;
            vnp.requestData.vnp_ReturnUrl = VNPAY_RETURN_URL;

            let vnpayPaymentURL = vnp.getPaymentURL(VNPAY_PAYMENT_URL, VNPAY_HASH_SECRET_KEY);
            console.log(vnpayPaymentURL);

            // Redirect to VNPay
            window.location.href = vnpayPaymentURL;
        } else {
            console.log("Form input not valid");
        }
    } else {
        // Render payment.html
        renderPaymentForm();
    }
}

// Implement the equivalent JavaScript functions for getClientIP(), getCurrentDateTime(), and renderPaymentForm() as needed.
