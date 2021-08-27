<template>
  <div class="qr">
    <div id="canvas"></div>
    <h3 class="heading">Log in Telegram by QR Code</h3>
    <ul class="list">
      <li class="item">Open Telegram on your phone</li>
      <li class="item">
        <span>Go to</span>
        <strong style="margin-left: .5em"> Settings > Devices > Scan QR</strong>
      </li>
      <li class="item">Point your phone at this screen to confirm login</li>
    </ul>
    <button class="btn" @click="changeLoginView()">
      LOG IN BY PHONE NUMBER
    </button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import mtp from "@/utils/mtproto3";
import QRCodeStyling from "qr-code-styling";
export default {
  setup(_, { emit }) {
    const qrCanvas = ref(null);
    const imageSrc = ref("");
    const token = ref("");

    function changeLoginView() {
      emit("changeLoginView", 2);
    }

    function base64url_encode(buffer) {
      return btoa(
        Array.from(new Uint8Array(buffer), b => String.fromCharCode(b)).join("")
      )
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    // async function test() {
    //   const allChats = await mtp.call("messages.getAllChats", {
    //     except_ids: []
    //   });
    //   console.log("resolvedPeer", allChats);
    // }

    function getQR(base64, logoUrl) {
       const qrCode = new QRCodeStyling({
            width: 240 * window.devicePixelRatio,
            height: 240 * window.devicePixelRatio,
            data: "tg://login?token=" + base64,
            image: logoUrl,
            dotsOptions: {
              color: "#000",
              type: "rounded"
            },
            cornersSquareOptions: {
              type: "extra-rounded"
            },
            imageOptions: {
              imageSize: 1,
              margin: 0
            },
            backgroundOptions: {
              color: "white"
            },
            qrOptions: {
              errorCorrectionLevel: "L"
            }
          });

          qrCode.append(document.getElementById("canvas"));
          let canvas = document.getElementById("canvas");
          if (canvas.children.length > 1) {
            canvas.removeChild(canvas.firstElementChild);
          }
    }

    async function getLogoUrl() {
     return await fetch("assets/images/logo_padded.svg")
            .then(res => res.text())
            .then(text => {
              text = text.replace(/(fill:).+?(;)/, `$1${'#50a2e9'}$2`);
              const blob = new Blob([text], {
                type: "image/svg+xml;charset=utf-8"
              });

              return new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => {
                  resolve(e.target.result);
                };
                reader.readAsDataURL(blob);
              });
            });
    }

    function newQr() {
      mtp
        .call("auth.exportLoginToken", {
          except_ids: []
        })
        .then( async result => {
          token.value = base64url_encode(result.token);
          const logoUrl = await getLogoUrl()
          getQR(base64url_encode(result.token), logoUrl)
        })
        .catch(err => {
          console.log("Error", err);
        });
    }

    onMounted(() => {
      newQr();
      localStorage.setItem("interval_id", setInterval(() => {
        newQr();
      }, 30000))

      // qrCode.value.append(this.$refs["qrCode"])
    });
    return {
      changeLoginView,
      qrCanvas,
      imageSrc
    };
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googlemtps.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

:root {
  counter-reset: listItem;
}

.qr {
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  width: 25.5rem;
  margin: 0 auto;
}

.heading {
  margin-top: 20px;
  margin-bottom: 0;
}

.item {
  padding: 10px 0;
  list-style: none;
  counter-increment: listItem;
  display: flex;
  align-items: center;

  &::before {
    content: counter(listItem);
    margin-right: 15px;
    padding: 0.2em 0.5em;
    background-color: $primary-color;
    color: white;
    border-radius: 50%;
  }
}

.btn {
  @include btn__login;
}
</style>