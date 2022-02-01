import React from "react";

const Donate = () => {
  return (
    <form action="https://www.paypal.com/donate" method="post" target="_top">
      <input type="hidden" name="business" value="FDVGAWHGUMLW2" />
      <input type="hidden" name="no_recurring" value="0" />
      <input type="hidden" name="item_name" value="Server donation" />
      <input type="hidden" name="currency_code" value="EUR" />
      <input
        type="image"
        src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
        border="0"
        name="submit"
        title="PayPal - The safer, easier way to pay online!"
        alt="Donate with PayPal button"
      />
      <img
        alt=""
        border="0"
        src="https://www.paypal.com/en_SK/i/scr/pixel.gif"
        width="1"
        height="1"
      />
    </form>
  );
};

export default Donate;
