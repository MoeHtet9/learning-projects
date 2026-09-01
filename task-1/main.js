$(document).ready(function(){

    $('.prices').show();
    $('.order_page').hide();

    count();
    function count() {
        let price_data_string = localStorage.getItem('prices');

        if(price_data_string){

            let price_data_array = JSON.parse(price_data_string);            

            if(price_data_array !== null){
                $('#count_item').text(price_data_array.length)                
            }

        };
    };

    $('.add_to_cart').click(function() {

        let no = $(this).data('no');
        let hash_rate = $(this).data('hash_rate');
        let amout = $(this).data('amout');

        // console.log(no,hash_rate,amout);
        
        let price_data = {

            no:no,
            hash_rate:hash_rate,
            amout:amout,
            qty:1

        };

        let price_data_string = localStorage.getItem('prices');
        let price_data_array = [];

        if(price_data_string == null){
            price_data_array = [];
        }else{
            price_data_array = JSON.parse(price_data_string);
        }


        let status = false;
        $.each(price_data_array,function(i,v){
            if(no === v.no){
                status = true;
                v.qty++;
            }
        });

        if(status === false){
            price_data_array.push(price_data);
        };
        
        let priceData = JSON.stringify(price_data_array);
        localStorage.setItem('prices',priceData);

        count();

    });

    $('#order_page').click(function(){
        $('.prices').hide();
        $('.order_page').show();
        price_tbody();
    });

    $('#home_page').click(function(){
        $('.prices').show();
        $('.order_page').hide();
    });

    function price_tbody(){
        
        let price_data_string = localStorage.getItem('prices');
        let price_data_array ;
        if(price_data_string){
            price_data_array = JSON.parse(price_data_string)
        }
        let priceTable = '' ;
        let j = 1;
        let total = 0;
        // console.log(price_data_array);
        $.each(price_data_array,function(i,v){

            priceTable += `
                <tr>
                    <td>${j++}</td>
                    <td>${v.hash_rate} Kh/s</td>
                    <td>3</td>
                    <td>${v.amout} USDT</td>
                    <td>
                        <button class="min" data-key="${i}"> - </button>
                        ${v.qty}
                        <button class="max" data-key="${i}"> + </button>
                    </td>
                    <td>${v.amout * v.qty}</td>
                </tr>`;

                total += v.amout * v.qty ;

        });

        $('#total_amout').text(total);
        $('#priceTable').html(priceTable);

    };

    $('#priceTable').on('click','.min',function(){

        let key = $(this).data('key');
        // console.log(key);
        let price_data_string = localStorage.getItem('prices');
        if(price_data_string){

            let price_data_array = JSON.parse(price_data_string);
            // console.log(price_data_array[key].qty);
            
            if(price_data_array[key].qty < 2){
                price_data_array.splice(key,1);
            }else{
                price_data_array[key].qty--;
            }

            let qty_data = JSON.stringify(price_data_array);
            localStorage.setItem('prices',qty_data);

        }

        price_tbody();
        count();

    });

    $('#priceTable').on('click','.max',function(){

        let key = $(this).data('key');
        // console.log(key);
        let price_data_string = localStorage.getItem('prices');
        if(price_data_string){

            let price_data_array = JSON.parse(price_data_string);
            price_data_array[key].qty++;
            
            let qty_data = JSON.stringify(price_data_array);
            localStorage.setItem('prices',qty_data);

        }

        price_tbody();

    });

    $('#order_now').click(function(){

        let ans = confirm("Are you sure order");
        if(ans){
            localStorage.removeItem('prices');
            $('.prices').show();
            $('.order_page').hide();
            $('#count_item').text(0);
        }

    });

});