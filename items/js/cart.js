show()

function show() {
    $.ajax({
        type: "Get",
        url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
        data: {
            id: localStorage.getItem("u-id"),
        },
        success: function(res) {
            console.log(res.data);
            let products = res.data;
            var str = '';
            products.forEach(v => {
                var nums = v.pprice * v.pnum;
                str += `
                <div class="cart-heads">
                    <div class="checked-btns">
                        <input type="checkbox" class="checked-A-btn" >
                    </div>
                    <div class="messages">
                        <img src="${v.pimg}" alt="" />
                        <div class="messages-rig">
                            <span class="span-one">${v.pname}</span><br>
                            <span class="span-two">${v.pdesc}</span><br>
                            <span class="span-three">${v.pprice}</span>
                        </div>
                    </div>
                    <ul class="oUls">
                        <li class="one">${v.pprice}</li>
                        <li class="two">
                            <button class="reduce" data-id="${v.pid}">-</button>
                            <input type="text" value="${v.pnum}" class="ipt" data-num="${v.pnum}">
                            <button class="add" data-id="${v.pid}">+</button>
                        </li>
                        <li class="three">${nums}</li>
                        <li class="four">
                            <button class="delBtn" data-id="${v.pid}" >删除</button>
                        </li>
                    </ul>
                </div>
        `
            })
            $("#section").html(str);
            allCheckedBtn() //多选选中,单选全选
            aCheckedBtn() //单选全选，多选选中
            getTotalPrice() //总价
            delData() //商品删除
            dataReduce() //数量减少
            dataAdd() //数量增加
        }
    })
}

//数量每变一次，就要更新一次购物车以及价格改变，总价改变
// 多选选中,单选全选
function allCheckedBtn() {
    $('#checked-all-btn').click(function() {
        $('.checked-A-btn').prop('checked', this.checked)
        getTotalPrice() //总价
    })
}

//单选全选，多选选中
function aCheckedBtn() {
    $('.checked-A-btn').click(function() {
        if ($('.checked-A-btn').length == $('.checked-A-btn:checked').length) {
            $('#checked-all-btn').prop('checked', true)
        } else {
            $('#checked-all-btn').prop('checked', false)
        }
        getTotalPrice() //总价
    })
}

//计算总价
function getTotalPrice() {
    var sum = 0;
    for (let i = 0; i < $(".checked-A-btn").length; i++) {
        if ($('.checked-A-btn').eq(i).prop('checked')) { //判断单选按钮是否勾选
            sum += +$(".three").eq(i).html(); //求和
        }
    }
    $("#sum").html(sum);
}


//删除商品
function delData() {
    $(".delBtn").click(function() {
        $.ajax({
            url: 'http://jx.xuzhixiang.top/ap/api/cart-delete.php',
            type: 'get',
            data: {
                uid: localStorage.getItem('u-id'),
                pid: $(this).attr('data-id')
            },
            success: () => {
                $(this).parent().parent().parent().remove()
                getTotalPrice()
                allCheckedBtn()
                aCheckedBtn()
                    //删除时判断 单选的按钮=多选按钮
                if ($('.checked-A-btn').length == $('.checked-A-btn:checked').length) {
                    $('#checked-all-btn').prop('checked', true) //相等ture
                } else {
                    $('#checked-all-btn').prop('checked', false) //不等false
                }
            },
            error: (error) => {
                console.log(error)
            }
        })
    })
}

//减少商品
function dataReduce() {
    $(".reduce").click(function() {
        let nowNum = $(this).next().attr('data-num')
        if ($(this).next().val() - 0 == 1) {
            return
        }
        $(this).next().attr('data-num', nowNum - 1)
        $.ajax({
            url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
            type: "Get",
            data: {
                uid: localStorage.getItem('u-id'),
                pid: $(this).attr('data-id'),
                pnum: nowNum - 1
            },
            success: () => {
                $(this).next().val($(this).next().val() - 1)
                $(this).parent().next().html(parseInt(parseInt($(this).parent().prev().html()) * $(this).next().val()))
                getTotalPrice()
            },
            error: (error) => {
                console.log(error)
            }
        })
    })
}

//增加商品
function dataAdd() {
    $(".add").click(function() {
        let nowNum = $(this).prev().attr('data-num');
        $(this).prev().attr('data-num', nowNum - 0 + 1)
        $.ajax({
            url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
            type: "Get",
            data: {
                uid: localStorage.getItem('u-id'),
                pid: $(this).attr('data-id'),
                pnum: +nowNum + 1
            },
            success: () => {
                $(this).prev().val($(this).prev().val() - 0 + 1);
                $(this).parent().next().html(parseInt($(this).parent().prev().html()) * $(this).prev().val());
                getTotalPrice()
            },
            error: (error) => {
                console.log(error)
            }
        })

    })
}