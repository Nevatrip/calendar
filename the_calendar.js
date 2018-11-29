const eventsUrl = "http://192.168.31.7:3000/";

// Получаем список языков
const getLang = request => {
  request.success( [
    { text: "Русский", value: "ru", color: "#108020"},
    { text: "English", value: "en", color: "#30A0F0"},
    { text: "漢語", value: "zh", color: "#F050A0"}
  ] );
};

// Получаем список направлений
const getExcursion = request => {
  request.success( [
    { text: "Метеор в Петергоф", value: 1 },
    { text: "АКЦИЯ - Экскурсия под развод мостов на 2-палубном теплоходе", value: 2 },
    { text: "Реки и каналы центрального Петербурга", value: 3 },
    { text: "Реки и каналы", value: 4 },
    { text: "Северная Венеция", value: 5 },
    { text: "Кронштадт", value: 6 }
  ] );
};

// Получаем список направлений
const getDirection = request => {
  request.success( [
    { text: "СПБ - Петергоф", value: 1 },
    { text: "Петергоф - СПБ", value: 2 },
    { text: "Под разводными мостами", value: 3 },
    { text: "Реки и каналы", value: 4 },
    { text: "Северная Венеция", value: 5 },
    { text: "Кронштадт", value: 6 }
  ] );
};

// Получаем список пунктов отправления
const getPiers = request => {
  request.success( [
    { text: "Дворцовая набережная", value: 1 },
    { text: "Сенатская пристань", value: 2 },
    { text: "Петропавловская крепость", value: 3 }
  ] );
};

// Получаем список транспортных средств
const getVehicle = request => {
  request.success( [
    { text: "Однопалубный теплоход с закрытой и открытой палубой", value: 1 },
    { text: "Теплоход «А. Скрябин»", value: 2 },
    { text: "Комфортабельный двухпалубный теплоход-ресторан", value: 3 }
  ] );
};

// Получаем список достопримечательностей
const getSight = request => {
  request.success( [
    { text: "Адмиралтейство", value: 1 },
    { text: "Эрмитаж", value: 2 },
    { text: "Стрелка Васильевского острова", value: 3 }
  ] );
};

// Получаем список тегов
const getTag = request => {
  request.success( [
    { text: "Тег #1", value: 1 },
    { text: "Тег #2", value: 2 },
    { text: "Тег #3", value: 3 }
  ] )
};

// Получаем список услуг транспортного средства
const getVehicleFeature = request => {
  request.success( [
    { text: "Бар", value: 1 },
    { text: "Туалет", value: 2 },
    { text: "Низкоорбитальная бластерная пушка", value: 3 }
  ] )
};

// Получаем список типов билетов
const getTicketType = request => {
  request.success( [
    { text: "Открытое", value: 1 },
    { text: "Закрытое", value: 2 },
    { text: "Гибридное", value: 3 },
    { text: "С открытой датой", value: 4 },
  ] )
};

// Сюда передаём данные экскурсии — они будут подставляться в значения
// по умолчанию для дальнейшего переопределения
const tour = {
  langArray: [ "ru" ],

  name: "АКЦИЯ - Экскурсия под развод мостов на 2-палубном теплоходе",
  description: 'Описание экскурсии',
  ticketType: 3,
  pierStartId: 2,
  pierFinishId: 1,
  mapUrl: 'https://maps.yandex.ru/23784659356',
  tripDirection: 'Москва — Петушки',
  vehicleId: 1,
  vehicleFeaturesArray: [ 2 ],
  sightArray: [ 1 ],
  tipBuy: 'Купите этот билет',
  tipTicket: 'Распечатайте этот билет',
  buyTime: null,
  tagArray: [ 2, 3 ],
  ticketPrint: true,
  count: 100,
};

$(function() {
  kendo.culture("ru-RU");

  $("#scheduler").kendoScheduler({
    date: new Date(),
    startTime: new Date(),
    height: 900,
    eventTemplate: $("#event-template").html(),
    editable: {
      template: $("#customEditorTemplate").html(),
    },
    edit: e => {

      function onChangeLang(e) {
        var langArr = this.value();
        var langArrMsg = $('#langArray').closest('.k-edit-field').find('.k-error');

        $('.langField').slideUp( 0 );

        if ( langArr.length == 0 ){
          langArrMsg.html("<b>Поле обязательно для заполнения!</b>");
        } else {
          if  ( langArr.indexOf( 'ru' ) != -1 ){
            langArrMsg.html("");
          } else {
            langArrMsg.html("<b>ВНИМАНИЕ!</b><br>Вы исключили русский язык!");
          }

          langArr.forEach( function (lang) {
            $('.langField_' + lang).slideDown( 0 );
          } )
        }
      }

      $("#langArray").kendoMultiSelect({
        dataBind: "langArray",
        dataSource: {transport: {read: getLang}},
        value: tour.langArray,
        dataTextField: "text",
        dataValueField: "value",
        placeholder: "Должен быть выбран хотя бы один язык!",
        change: onChangeLang,

      });

      $('#grid-ticket').kendoGrid({
        dataSource: new kendo.data.DataSource({
          pageSize: 6,
          data: [
            {
              productID : 1,
              productName : "Взрослый",
              price : 320,
              buyed: 50,
              description : "Bla-bla-bla…"
            }, {
              productID : 2,
              productName : "Детский",
              price : 280,
              buyed: 50,
              description : "Bla-bla-bla…"
            }, {
              productID : 3,
              productName : "Льготный",
              price : 260,
              buyed: 50,
              description : "Bla-bla-bla…"
            }
          ],
          autoSync: true,
          schema: {
            model: {
              id: "productID",
              fields: {
                productID: { editable: false, nullable: true },
                productName: { defaultValue: "Взрослый", validation: { required: true } },
                description: { defaultValue: "" },
                price: { type: "number", validation: { required: true, min: 0 } },
                buyed: { editable: false, type: "number", validation: { min: 0 } },
              }
            }
          }
        }),
        pageable: false,
        // height: 550,
        toolbar: ["create"],
        columns: [
          { field:"productName",title:"Билет" },
          // { field: "description", title: "Описание" },
          { field: "price", title:"Стоимость", format: "{0:c}" },
          { field: "buyed", title:"Продано" },
          { command: "destroy", title: " " }],
        editable: true
      });

      $('#grid-additional').kendoGrid({
        dataSource: new kendo.data.DataSource({
          pageSize: 6,
          data: [
            {
              productID : 1,
              productName : "Дождевик",
              price : 320,
              description : "Bla-bla-bla…"
            }, {
              productID : 2,
              productName : "Зонт",
              price : 280,
              description : "Bla-bla-bla…"
            }, {
              productID : 3,
              productName : "Кокаин",
              price : 260,
              description : "Bla-bla-bla…"
            }
          ],
          autoSync: true,
          schema: {
            model: {
              id: "productID",
              fields: {
                productID: { editable: false, nullable: true },
                productName: { defaultValue: "Взрослый", validation: { required: true } },
                description: { defaultValue: "" },
                price: { type: "number", validation: { required: true, min: 0 } }
              }
            }
          }
        }),
        pageable: false,
        // height: 550,
        toolbar: ["create"],
        columns: [
          { field:"productName",title:"Билет" },
          // { field: "description", title: "Описание" },
          { field: "price", title:"Стоимость", format: "{0:c}" },
          { command: "destroy", title: " " }],
        editable: true
      });
    },
    views: [
      "day",
      "week",
      { type: "month", selected: true },
      "agenda"
    ],
    timezone: "Europe/Moscow",
    dataSource: {
      batch: true,
      transport: {
        read: {
          url: eventsUrl + 'events',
          type: "GET",
          dataType: "json"
        },
        update: {
          url: eventsUrl + 'events',
          type: "PATCH",
          dataType: "json"
        },
        create: {
          url: eventsUrl + 'events',
          type: "POST",
          dataType: "json"
        },
        destroy: {
          url: eventsUrl + 'events',
          type: 'DELETE',
          dataType: "json"
        },
        parameterMap: function(options, operation) {
          if (operation !== "read" && options.models) {
            return {models: kendo.stringify(options.models)};
          }
        }
      },
      schema: {
        type: "json",
        data: "model",
        total: "total",
        model: {
          id: "id",
          fields: {
            // Языки экскурсии
            langArray: { from: "langArray", defaultValue: tour.langArray, validation: { required: true }, editable: true, nullable: true },

            // ID рейса
            taskId: { from: "id", type: "string" },
            // ID экскурсии
            tourId: { from: "parent", type: "number", defaultValue: 0 },
            // Название экскурсии
            title: { from: "title", defaultValue: tour.name, validation: { required: true } },
            // Начало рейса
            start: { from: "start", type: "date" },
            // Окончание рейса
            end: { from: "end", type: "date" },
            // Рейс длится весь день
            isAllDay: { from: "isAllDay", type: "boolean", defaultValue: false },
            // Повторение
            recurrenceId: { from: "recurrenceID" },
            // Правило повторения
            recurrenceRule: { from: "recurrenceRule" },
            // Исключение
            recurrenceException: { from: "recurrenceException" },
            // В каком часовом поясе начинается рейс
            startTimezone: { from: "startTimezone" },
            // В каком часовом поясе оканчивается рейс
            endTimezone: { from: "endTimezone" },
            // Описание экскурсии
            description: { from: "description", defaultValue: tour.description },
            // Причал отправления
            pierStartId: { from: "tv_pierStartId", defaultValue: tour.pierStartId },
            // Причал прибытия
            pierFinishId: { from: "tv_pierFinishId", defaultValue: tour.pierFinishId },
            // Тип билета: открытое время, точное время, гибрид, открытая дата
            ticketType: { from: "tv_ticketType", defaultValue: tour.ticketType },
            // Ссылка на схему маршрута
            mapUrl: { from: "tv_mapURL", defaultValue: tour.mapUrl },
            // Направление
            tripDirection: { from: "tv_tripDirection", defaultValue: tour.tripDirection },
            // ID транспортного средства
            vehicleId: { from: "tv_vehicleId", defaultValue: tour.vehicleId },
            // Что есть на борту транспортного средства
            vehicleFeaturesArray: { from: "tv_vehicleFeaturesArray", defaultValue: tour.vehicleFeaturesArray },
            // Достопримечательности
            sightArray: { from: "tv_sightArray", defaultValue: tour.sightArray },
            // Совет при покупке
            tipBuy: { from: "tv_tipBuy", defaultValue: tour.tipBuy },
            // Совет в билете
            tipTicket: { from: "tv_tipTicket", defaultValue: tour.tipTicket },
            // Время прекращения продажи билета
            buyTime: { from: "tv_buyTime", defaultValue: tour.buyTime },
            // Теги
            tagArray: { from: "tv_tags", defaultValue: tour.tagArray },
            // Билет нужно распечатать
            ticketPrint: { from: "tv_ticketPrint", defaultValue: tour.ticketPrint },
            // Количество билетов на продажу
            count: { from: "tv_ticketCount", defaultValue: tour.count },
          }
        }

      },
    }
  });



  function fitWidget() {
    var widget = $("#scheduler").data("kendoScheduler");
    var height = $(window).outerHeight();

    //size widget to take the whole view
    widget.element.height(height);
    widget.resize(true);
  }

  $(window).resize(function() {
    clearTimeout(window._resizeId);
    window._resizeId = setTimeout(function() {
      fitWidget();
    }, 500);
  });

  fitWidget();
});

// // Получаем список языков
// const getLang = request => {
//   request.success( [
//     { text: "Русский", value: "ru", color: "#108020" },
//     { text: "English", value: "en", color: "#30A0F0" },
//     { text: "漢語", value: "zh", color: "#F050A0" }
//   ] );
// };
//
//
//
// // functions:
// //выбор - какое событие показывать в календаре
// function selectEvent(){
//   var checked = $.map($("#ships :checked"), function (checkbox) {
//     return parseInt($(checkbox).val());
//   });
//
//   var scheduler = $("#scheduler").data("kendoScheduler");
//
//   scheduler.dataSource.filter({
//     operator: function (task) {
//       return $.inArray(task.eventId, checked) >= 0;
//     }
//   });
// };
//
// function scheduler() {
//   kendo.culture("ru-RU");
//
//   $("#scheduler").kendoScheduler({
//     date: new Date("2018/6/15 12:00 AM"),
//     startTime: new Date("2018/6/15 11:59 PM"),
//     height: 900,
//     views: [
//       "day",
//       "week",
//       { type: "month", selected: true },
//       "agenda"
//     ],
//     timezone: "Europe/Moscow",
//     resources: [
//       {
//         field: "eventId",
//         title: "event",
//         dataSource: [
//           {text: "meteor", value: 1, color: "#f8a398"},
//           {text: "palmira", value: 2, color: "#51a0ed"},
//           {text: "koryshka", value: 3, color: "#56ca85"}
//         ]
//       },
//       // {
//       //   field: "provider",
//       //   title: "provider",
//       //   dataSource: [
//       //
//       //   ]
//       // }
//     ],
//     dataSource: {
//       batch: true,
//       transport: {
//         read: {
//           url: eventsUrl + "${ tour.id }/trip/getlist?deleted=false",
//           dataType: "json"
//         },
//         update: {
//           url: eventsUrl + "${ tour.id }/trip/update",
//           dataType: "json",
//           type: "POST"
//         },
//         create: {
//           url: eventsUrl + "${ tour.id }/trip/create",
//           dataType: "json",
//           type: "POST"
//         },
//         destroy: {
//           url: eventsUrl + "${ tour.id }/trip/delete",
//           dataType: "json",
//           type: "POST"
//         },
//         parameterMap: function(options, operation) {
//           if (operation !== "read" && options.models) {
//             return {models: kendo.stringify(options.models)};
//           }
//         }
//       },
//     },
//     eventTemplate: $("#event-template").html(),
//     editable: {
//       template: $("#customEditorTemplate").html(),
//     },
//     filter: { field: "deleted", operator: "neq", value: true },
//     schema: {
//       data: "object",
//       model: {
//         id: "taskId",
//         fields: {
//           globalLangArray: {from: "globalLangArray", defaultValue: eventDefault.globalLangArray,},
//         }
//       },
//     }
//   });
// }
//
// function setLang( langArr ){
//   var isRus = [];
//   for ( var i = 0; i < langArr.length; i++ ) {
//     var lang = langArr[i];
//     if (lang.indexOf('ru') !== -1) {
//       isRus.push(lang);
//     }
//   }
//   if ( isRus.length == 0 ){
//     alert('Внимание! Без выбора русского языка эта экскурсия не будет размещена на русскоязычном сайте!');
//   }
// };
//
// function setProvider( provider ){};
//
// function setExcursion( excursion ){};
//
// function render( name, caption, result, place ) {
//   return '<div class="outer">\n' +
//           '<div class="k-edit-label">' +
//            '<label for="' + name + '">' + caption + '</label>' +
//           '</div>' +
//           '<div data-container-for="' + name + '">\' class="k-edit-field">' +
//             result +
//           '</div>';
// };
//
// function onChange() {
//   сonsole.log("event: change");
// }
//
// function onSelect(e) {
//   var dataItem = e.dataItem;
//   сonsole.log("event :: select (" + dataItem.text + " : " + dataItem.value + ")" );
// };
//
//
//
// // on start:
// getLang();
// scheduler();
// selectEvent();
//
//
//
// // on window opening:
// $("#customEditorTemplate").kendoWindow({
//   open: function() {
//     console.log('окно окрыто');
//     loadLangSelect();
//   }
// });
//
//
//
// // on events
// $("#ships :checkbox").change(function (e) {
//   selectEvent();
// });
//
// $(document).on("click","#btnAddTicket", function(e){
//   $('#ticketsTable').append(
//     '<tr>\n' +
//     '   <td>\n' +
//     '     <select class="k-textbox k-input" required="required">\n' +
//     '       <option disabled selected value> -- тип -- </option>\n' +
//     '       <option>Взрослый</option>\n' +
//     '       <option>Льготный</option>\n' +
//     '       <option>Детский</option>\n' +
//     '     </select>\n' +
//     '   </td>\n' +
//     '   <td>\n' +
//     '     <input type="text" class="k-textbox k-input" value="" required="required">\n' +
//     '   </td>\n' +
//     '   <td>\n' +
//     '     <textarea class="k-textbox" required="required"></textarea>\n' +
//     '   </td>\n' +
//     '   <td>\n' +
//     '     <input type="text" class="k-textbox k-input" value="" required="required">\n' +
//     '   </td>\n' +
//     '   <td>\n' +
//     '     <select class="k-textbox k-input" required="required">\n' +
//     '       <option disabled selected value> -- категория -- </option>\n' +
//     '       <option>Стандарт</option>\n' +
//     '       <option>Эконом</option>\n' +
//     '       <option>Вип</option>\n' +
//     '       <option>Вип-5</option>\n' +
//     '    </select>\n' +
//     '  </td>\n' +
//     '  <td>-</td>\n' +
//     '  <td>-</td>\n' +
//     '  <td><input type="text" class="k-textbox k-input" value="" required="required"></td>\n' +
//     '</tr>'
//   )
// });
//
// $(document).on("click","#btnAddService", function(e){
//   $('#ticketsService').append(
//     '<tr>\n' +
//     '  <td>\n' +
//     '    <select class="k-textbox k-input" required="required">\n' +
//     '      <option disabled selected value> -- товар -- </option>\n' +
//     '      <option>Зонт</option>\n' +
//     '      <option>Дождевик</option>\n' +
//     '      <option>Дождевик детский</option>\n' +
//     '      <option>Букет цветов</option>\n' +
//     '    </select>\n' +
//     '  </td>\n' +
//     '  <td>\n' +
//     '    <input type="text" class="k-textbox k-input" value="" required="required">\n' +
//     '  </td>\n' +
//     '  <td>\n' +
//     '    <textarea class="k-textbox" required="required"></textarea>\n' +
//     '  </td>\n' +
//     '  <td>\n' +
//     '    <input type="text" class="k-textbox k-input" value="" required="required">\n' +
//     '  </td>\n' +
//     '  <td>-</td>\n' +
//     '  <td>-</td>\n' +
//     '  <td><input type="text" class="k-textbox k-input" value="" required="required"></td>\n' +
//     '</tr>'
//   )
// });






