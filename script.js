(() => {
  const $ = document.querySelector.bind(document);

  let timeRotate = 7000; //7 giây
  let currentRotate = 0;
  let isRotating = false;
  const wheel = $(".wheel");
  const btnWheel = $(".btn--wheel");
  const showMsg = $(".msg");

  //=====< Danh sách phần thưởng >=====
  const listGift = [
    {
      text: "10.000 😘",
      percent: 0 / 100,
    },
    {
      text: "20.000 ✌🏻",
      percent: 100 / 100,
    },
    {
      text: "30.000 🥰",
      percent: 0 / 100,
    },
    {
      text: "20k+ 1 lượt quay 🥳",
      percent: 0 / 100,
    },
    {
      text: "x2 số tuổi 🫣",
      percent: 0 / 100,
    },
    {
      text: "x2 người trước",
      percent: 0 / 100,
    },
    {
      text: "40.000 😉",
      percent: 0 / 100,
    },
    {
      text: "1/2 người trước",
      percent: 0 / 100,
    },
    {
      text: "50.000 hoặc quay lại 😍",
      percent: 0 / 100,
    },
    {
      text: "100.000 🤲",
      percent: 0 / 100,
    },
    {
      text: "150.000",
      percent: 0 / 100,
    },
    {
      text: "200.000 🌝",
      percent: 0,
    },
  ];

  //=====< Số lượng phần thưởng >=====
  const size = listGift.length;

  //=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
  const rotate = 360 / size;

  //=====< Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm >=====
  const skewY = 90 - rotate;

  listGift.map((item, index) => {
    //=====< Tạo thẻ li >=====
    const elm = document.createElement("li");

    //=====< Xoay và tạo độ nghiêng cho các thẻ li >=====
    elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;

    //=====< Thêm background-color so le nhau và căn giữa cho các thẻ text>=====
    if (index % 2 == 0) {
      elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
        rotate / 2
      }deg);" class="text text-1">
			<b>${item.text}</b>
		</p>`;
    } else {
      elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
        rotate / 2
      }deg);" class="text text-2">
		<b>${item.text}</b>
		</p>`;
    }

    //=====< Thêm vào thẻ ul >=====
    wheel.appendChild(elm);
  });

  /********** Hàm bắt đầu **********/
  const start = () => {
    showMsg.innerHTML = "";
    isRotating = true;
    //=====< Lấy 1 số ngầu nhiên 0 -> 1 >=====
    const random = Math.random(0, 1);
    //=====< Gọi hàm lấy phần thưởng >=====
    const gift = getGift(random);

    //=====< Số vòng quay: 360 độ = 1 vòng (Góc quay hiện tại) >=====
    currentRotate += 360 * 10;

    //=====< Gọi hàm quay >=====
    rotateWheel(currentRotate, gift.index);

    //=====< Gọi hàm in ra màn hình >=====
    showGift(gift);
  };
  /********** Hàm quay vòng quay **********/
  const rotateWheel = (currentRotate, index) => {
    $(".wheel").style.transform = `rotate(${
      //=====< Góc quay hiện tại trừ góc của phần thưởng>=====
      //=====< Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa >=====
      currentRotate - index * rotate - rotate / 2
    }deg)`;
  };

  /********** Hàm lấy phần thưởng **********/
  const getGift = (randomNumber) => {
    let currentPercent = 0;
    let list = [];

    listGift.forEach((item, index) => {
      //=====< Cộng lần lượt phần trăm trúng của các phần thưởng >=====
      currentPercent += item.percent;

      //=====< Số ngẫu nhiên nhỏ hơn hoặc bằng phần trăm hiện tại thì thêm phần thưởng vào danh sách >=====
      if (randomNumber <= currentPercent) {
        list.push({ ...item, index });
      }
    });
    //=====< Phần thưởng đầu tiên trong danh sách là phần thưởng quay được>=====
    return list[0];
  };

  /********** In phần thưởng ra màn hình **********/
  const showGift = (gift) => {
    let timer = setTimeout(() => {
      isRotating = false;

      showMsg.innerHTML = `<p style="color: red; font-size:24px; text-align:center">Chúc mừng bạn đã nhận được ${gift.text}</p>`;

      clearTimeout(timer);
    }, timeRotate);
  };

  /********** Sự kiện click button start **********/
  btnWheel.addEventListener("click", () => {
    !isRotating && start();
  });
// //Chống copy
function killCopy(e) {
  return false;
}

function reEnable() {
  return true;
}

document.onselectstart = new Function("return false");

if (window.sidebar) {
  document.onmousedown = killCopy;
  document.onclick = reEnable;
}

function noteOut() {
  var note = document.querySelector(".note");
  note.style.display = "none";
}

setInterval(noteOut, 3000);

//Chống chuột phải
window.onload = function () {
  document.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    false
  );
  document.addEventListener(
    "keydown",
    function (e) {
      //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (
        e.keyCode == 83 &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
      }
      // "F12" key
      if (event.keyCode == 123) {
        disabledEvent(e);
      }
    },
    false
  );

  function disabledEvent(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
  }
};

//Chống Ctrl + U
document.onkeydown = function (e) {
  if (
    e.ctrlKey &&
    (e.keyCode === 67 ||
      e.keyCode === 86 ||
      e.keyCode === 85 ||
      e.keyCode === 117)
  ) {
    return false;
  } else {
    return true;
  }
};
$(document).keypress("u", function (e) {
  if (e.ctrlKey) return false;
  else return true;
});

})();
