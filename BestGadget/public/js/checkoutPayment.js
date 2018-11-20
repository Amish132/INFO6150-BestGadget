Stripe.setPublishableKey('pk_test_a4yIrjj0VSJOUb6GMzxixnql');

var $form = $("#checkoutpayment-form");
$form.submit(function(event){
  $form.find('button').prop("disabled", true);

  var number = $('#cc-number').val();
  var cvc = $('#cc-cvv').val();
  var exp_month = $('#cc-expiration-month').val();
  var exp_year = $('#cc-expiration-year').val();
  var name = $('#cc-name').val();
  Stripe.card.createToken({
    number: number,
    cvc: cvc,
    exp_month: exp_month,
    exp_year: exp_year,
    name: name
  }, stripeResponseHandler);
  return false;
});


function stripeResponseHandler(status, response) {
  if(response.error) {
 
    $("#charge-error").text(response.error.message);
    $("#charge-error").removeClass('d-none');
    $form.find("button").prop("disabled", true);
    
  }
  else {

    var token = response.id;
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    $form.get(0).submit();
  }

}