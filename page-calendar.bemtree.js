block('page')(
  def()((node) => {
    const tour = node.api.entities.tour[node.api.result.tour.object];

    return {
      ...applyNext(),
      styles: [
        {
          elem: 'css',
          url: '/assets/calendar/css/kendo.common.min.css',
        },
        {
          elem: 'css',
          url: '/assets/calendar/css/kendo.default.min.css',
        },
        {
          elem: 'css',
          url: '/assets/calendar/css/kendo.default.mobile.min.css',
        },
        {
          elem: 'css',
          url: '/assets/calendar/css/kendo.rtl.min.css',
        },
        {
          elem: 'css',
          content: `
            .page {
              margin: 0;
            }

            .k-scheduler-edit-form textarea.k-textbox {
              min-height: 2em;
              resize: vertical;
              padding: 5px;
              box-sizing: border-box;
            }

            .trip-template {
              padding: 5px;
            }

            .k-scheduler-edit-form .k-edit-label {
              width: 30%;
              padding-top: 12px;
              padding-bottom: 5px;
            }

            .k-scheduler-edit-form .k-edit-field {
              width: 64%;
            }

            .k-autocomplete,
            .k-colorpicker,
            .k-combobox,
            .k-datepicker,
            .k-datetimepicker,
            .k-dropdown,
            .k-listbox,
            .k-numerictextbox,
            .k-selectbox,
            .k-textbox,
            .k-timepicker,
            .k-toolbar .k-split-button {
              width: 100%;
            }

            .k-scheduler-edit-form .k-edit-form-container,
            .k-scheduler-timezones .k-edit-form-container {
              width: 100%;
              margin: 0 auto;
            }

            .container-modal {
              display: flex;
              flex-direction: column;
              width: 100%
            }

            .container-fields {
              flex: 1;
              column-count: 2;
            }

            .container-tables {
              width: 100%;
              margin-top: 10px;
              padding-left: 8px;
              padding-right: 8px;
              box-sizing: border-box;
            }
          `
        }
      ],
      scripts: [
        {
          elem: 'js',
          url: '/assets/calendar/js/jquery.min.js'
        },
        {
          elem: 'js',
          url: '/assets/calendar/js/jszip.min.js'
        },
        {
          elem: 'js',
          url: '/assets/calendar/js/kendo.all.min.js'
        },
        {
          elem: 'js',
          url: '/assets/calendar/js/kendo.timezones.min.js'
        },
        {
          elem: 'js',
          url: '/assets/calendar/js/cultures/kendo.culture.ru-RU.min.js'
        },
        {
          elem: 'js',
          url: '/assets/calendar/js/messages/kendo.messages.ru-RU.min.js'
        },
        {
          tag: 'script',
          attrs: {
            id: 'event-template',
            type: 'text/x-kendo-template',
          },
          content: {
            html: `
              <div class="trip-template">
                #: kendo.toString(start, "HH:mm", "ru-RU") #—#: kendo.toString(end, "HH:mm", "ru-RU") # | #: title #
              </div>
            `
          }
        },
        {
          tag: 'script',
          attrs: {
            id: 'customEditorTemplate',
            type: 'text/x-kendo-template',
          },
          content: {
            html: `
              <div class="container-modal">
                <div class="container-fields">
                  <div class="k-edit-label"><label for="title">Название рейса</label></div>
                  <div data-container-for="title" class="k-edit-field">
                    <textarea name="title" class="k-textbox" data-bind="value:title" required="required" rows="2"></textarea>
                  </div>
                  <div class="k-edit-label"></div>
                  <div data-container-for="isAllDay" class="k-edit-field">
                    <input type="checkbox" name="isAllDay" id="isAllDay" data-type="boolean" data-bind="checked:isAllDay">
                    <label for="isAllDay">Время отправления из API</label>
                  </div>
                  <div class="k-edit-label"><label for="start">Начало</label></div>
                  <div data-container-for="start" class="k-edit-field">
                    <input type="text"
                      data-role="datetimepicker"
                      data-interval="15"
                      data-type="date"
                      data-bind="value:start,invisible:isAllDay"
                      name="start"/>
                    <input type="text" data-type="date" data-role="datepicker" data-bind="value:start,visible:isAllDay" name="start" />
                    <span data-bind="text: startTimezone"></span>
                    <span data-for="start" class="k-invalid-msg" style="display: none;"></span>
                  </div>
                  <div class="k-edit-label"><label for="end">Конец</label></div>
                  <div data-container-for="end" class="k-edit-field">
                    <input type="text" data-type="date" data-role="datetimepicker" data-bind="value:end,invisible:isAllDay" name="end" data-datecompare-msg="End date should be greater than or equal to the start date" />
                    <input type="text" data-type="date" data-role="datepicker" data-bind="value:end,visible:isAllDay" name="end" data-datecompare-msg="End date should be greater than or equal to the start date" />
                    <span data-bind="text: endTimezone"></span>
                    <span data-bind="text: startTimezone, invisible: endTimezone"></span>
                    <span data-for="end" class="k-invalid-msg" style="display: none;"></span>
                  </div>
                  <div class="k-edit-label"><label for="stopTime">Прекратить продажу за (мин.)</label></div>
                  <div data-container-for="stopTime" class="k-edit-field">
                    <input type="text"
                      data-bind="value:stopTime"
                      class="k-input k-textbox"
                      name="stopTime"/>
                  </div>
                  <!--
                  <div class="k-edit-label" data-bind="invisible:isAllDay"><label for="buyTime">Прекратить продажу в</label></div>
                  <div data-container-for="buyTime" class="k-edit-field">
                    <input type="text"
                      data-role="timepicker"
                      data-interval="15"
                      data-culture="ru-RU"
                      data-parse-formats="yyyy-MM-ddTHH:mm:ss"
                      data-bind="value:buyTime,
                                invisible:isAllDay"
                      name="buyTime"/>
                  </div>
                  <div class="k-edit-label" data-bind="invisible:isAllDay"><label for="buyDay">Прекратить продажу</label></div>
                  <div data-container-for="buyDay" class="k-edit-field">
                    <select id="buyDay" data-bind="value:buyDay,invisible:isAllDay" data-source="{transport: {read: buyDay}}" data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
                  </div>
                  -->
                  <div class="k-edit-label"><label for="recurrenceRule">Повторять</label></div>
                  <div data-container-for="recurrenceRule" class="k-edit-field">
                    <div data-bind="value:recurrenceRule" name="recurrenceRule" data-role="recurrenceeditor"></div>
                  </div>
                  <div class="k-edit-label"><label for="ticketType">Тип времени</label></div>
                  <div data-container-for="ticketType" class="k-edit-field">
                    <select id="ticketType"
                            data-bind="value:ticketType"
                            data-source="{transport: {read: getTicketType}}"
                            data-role="multiselect"
                            multiple="multiple"
                            data-value-field="value"
                            data-text-field="text"
                            >
                    </select>
                  </div>
                  <div class="k-edit-label"><label for="pierStartId">Причал отправления</label></div>
                  <div data-container-for="pierStartId" class="k-edit-field">
                    <select id="pierStartId" data-bind="value:pierStartId" data-role="dropdownlist"></select>
                  </div>
                  <div class="k-edit-label"><label for="provider">Партнёр API</label></div>
                  <div data-container-for="provider" class="k-edit-field">
                    <select id="provider" data-bind="value:provider" data-role="dropdownlist"></select>
                  </div>
                  <!--
                  <div class="k-edit-label"><label for="pierFinishId">Причал прибытия</label></div>
                  <div data-container-for="pierFinishId" class="k-edit-field">
                    <select id="pierFinishId" data-bind="value:pierFinishId" data-role="dropdownlist"></select>
                  </div>
                  -->
                  <div class="k-edit-label"><label for="tripDirection">Направление</label></div>
                  <div data-container-for="tripDirection" class="k-edit-field">
                    <input type="text" class="k-input k-textbox" name="tripDirection" data-bind="value:tripDirection">
                  </div>
                  <div class="k-edit-label"><label for="mapUrl">Карта маршрута</label></div>
                  <div data-container-for="mapUrl" class="k-edit-field">
                    <input type="text" class="k-input k-textbox" name="mapUrl" data-bind="value:mapUrl">
                  </div>
                  <div class="k-edit-label"><label for="vehicleId">Транспортное средство</label></div>
                  <div data-container-for="vehicleId" class="k-edit-field">
                    <select id="vehicleId" data-bind="value:vehicleId" data-role="dropdownlist"></select>
                  </div>
                  <div class="k-edit-label"><label for="vehicleFeaturesArray">На борту</label></div>
                  <div data-container-for="vehicleFeaturesArray" class="k-edit-field">
                    <select id="vehicleFeaturesArray"
                            data-bind="value:vehicleFeaturesArray"
                            data-source="{transport:{read:getVehicleFeature}}"
                            data-role="multiselect"
                            multiple="multiple"
                            data-value-field="value"
                            data-text-field="text">
                    </select>
                  </div>
                  <!--
                  <div class="k-edit-label"><label for="sightArray">Достопримечательности</label></div>
                  <div data-container-for="sightArray" class="k-edit-field">
                    <select id="sightArray" data-bind="value:sightArray" multiple="multiple"></select>
                  </div>
                  -->
                  <!--
                  <div class="k-edit-label"><label for="langArray">Язык экскурсии</label></div>
                  <div data-container-for="langArray" class="k-edit-field">
                    <select id="langArray" data-bind="value:langArray" data-source="{transport: {read: getLang}}" data-role="multiselect" multiple="multiple" data-value-field="value" data-text-field="text"></select>
                  </div>
                  -->
                  <!--
                  <div class="k-edit-label"><label for="tagArray">Теги</label></div>
                  <div data-container-for="tagArray" class="k-edit-field">
                    <select id="tagArray" data-bind="value:tagArray" data-source="{transport: {read: getTag}}" data-role="multiselect" multiple="multiple" data-value-field="value" data-text-field="text"></select>
                  </div>
                  -->
                  <div class="k-edit-label"><label for="tipBuy">Совет при покупке</label></div>
                  <div data-container-for="tipBuy" class="k-edit-field">
                    <textarea name="tipBuy" class="k-textbox" data-bind="value:tipBuy"></textarea>
                  </div>
                  <div class="k-edit-label"><label for="tipTicket">Совет в билете</label></div>
                  <div data-container-for="tipTicket" class="k-edit-field">
                    <textarea name="tipTicket" class="k-textbox" data-bind="value:tipTicket"></textarea>
                  </div>
                  <!--
                  <div class="k-edit-label"><label for="description">Описание</label></div>
                  <div data-container-for="description" class="k-edit-field">
                    <textarea name="description" class="k-textbox" data-bind="value:description" rows="3"></textarea>
                  </div>
                  -->
                  <div class="k-edit-label"><label for="ticketPrint">Печать билета</label></div>
                  <div data-container-for="ticketPrint" class="k-edit-field">
                    <select id="ticketPrint" data-bind="value:ticketPrint" data-source="{transport: {read: ticketPrint}}" data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
                  </div>
                  <div class="k-edit-label" data-bind="invisible:isAllDay"><label for="seatsCount">Количество билетов</label></div>
                  <div data-container-for="seatsCount" class="k-edit-field">
                    <input type="text" name="seatsCount" class="k-input k-textbox" data-bind="value:seatsCount,invisible:isAllDay">
                  </div>
                </div>
                <div class="container-tables">
                  <div id="grid-ticket"></div>
                  <hr>
                  <h3>Доп. услуги</h3>
                  <div id="grid-additional"></div>
                </div>
              </div>
            `
          }
        },
        {
          tag: 'script',
          content: {
            html: `
              /*
               * Tour
               ************
              ${ JSON.stringify(tour, null, 2) }
              */

              // Прекратить продажу
              const buyDay = request => {
                request.success( [
                  { text: "В этот же день", value: 0 },
                  { text: "За день", value: 1 },
                  { text: "За два дня", value: 2 }
                ] )
              }

              const ticketPrint = request => {
                request.success( [
                  { text: "Да", value: 0 },
                  { text: "Нет", value: 1 },
                  { text: "Нет, сообщить номер администратору", value: 2 },
                  { text: "Астра", value: 3 },
                ] )
              }

              // Получаем список языков
              const getLang = request => {
                request.success( [
                  { text: "русский", value: 1, color: "#108020" },
                  { text: "английский", value: 2, color: "#30A0F0" },
                  { text: "китайский", value: 3, color: "#F050A0" }
                ] );
              }

              // Получаем список тегов
              const getTag = request => {
                request.success( [
                  { text: "Тег #1", value: 1 },
                  { text: "Тег #2", value: 2 },
                  { text: "Тег #3", value: 3 }
                ] )
              }

              // Получаем список услуг транспортного средства
              const getVehicleFeature = request => {
                request.success( [
                  { text: "туалет"    , value: 'male'    },
                  { text: "бар"       , value: 'glass'   },
                  { text: "еда"       , value: 'cutlery' },
                  { text: "экскурсия" , value: 'comment' },
                  { text: "музыка"    , value: 'music'   },
                ] )
              }

              // Получаем список типов билетов
              const getTicketType = request => {
                request.success( [
                  { text: "Открытое", value: 1 },
                  { text: "Фиксированное", value: 2 },
                  { text: "С открытой датой", value: 3 },
                ] )
              }

              // Сюда передаём данные экскурсии — они будут подставляться в значения
              // по умолчанию для дальнейшего переопределения
              const tourDefault = {
                name: '${ tour.longtitle }',
                description: '${ tour.description.replace(/\r\n/g, " ") }',
                ticketType: 1,
                pierStartId: ${ node.api.entities.pier[tour.tv_e_from].id },
                pierFinishId: ${ tour.tv_e_to },
                mapUrl: '${ tour.tv_e_map }',
                tripDirection: '${ tour.tv_e_start_points }',
                vehicleId: 1,
                vehicleFeaturesArray: ['${ tour.tv_e_on_boat.split(/\n/g).join('\',\'') }'],
                sightArray: ${ tour.tv_e_showplaces.length ? '[' + tour.tv_e_showplaces.split(',') + ']' : '' },
                langArray: [ 2 ],
                tipBuy: '',
                tipTicket: '${ tour.tv_e_advice_mail }',
                buyTime: null,
                buyDay: 1,
                tagArray: [ 2, 3 ],
                ticketPrint: 1,
                seatsCount: 100,
                tickets: ${ tour.tv_e_tickets || '[]' },
                provider: ${ tour.vendor || 1 },
              }

              let linkLoaded = false;

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
                  dataBound: function(e) {
                    if ( !linkLoaded ) {
                      $('.k-scheduler-navigation').after('${ tour.pagetitle } | <a href="https://nevatrip.dev.compaero.ru/camanager/?a=resource/update&id=${ tour.id }" target="_blank">Редактировать</a> | <a href="/${ tour.uri }" target="_blank">Просмотреть</a>');
                      linkLoaded = true;
                    }
                  },
                  edit: function(e) {
                    e.event.set("isAllDay", false);

                    if(e.event.isNew){
                      var start = e.container.find("[name=start][data-role=datetimepicker]");
                      var end = e.container.find("[name=end][data-role=datetimepicker]");
                      var startTime = new Date(e.event.start);
                      var endTime = new Date(startTime);
                          endTime.setHours(startTime.getHours() + 1);
                      $(start).data("kendoDateTimePicker").value(startTime); //set start date to the current date and time
                      $(end).data("kendoDateTimePicker").value(endTime); //set enddate to the current date and time

                      //this line needed, since the event time is still only 30 minutes. if you remove this, upon saving if you didnt touch the datetimepicker (leave as it) then it will save only 30 minutes while it showing 1 hour
                      e.event.end = endTime;
                    }

                    $("#pierStartId, #pierFinishId").kendoDropDownList({
                      dataTextField: "text",
                      dataValueField: "value",
                      dataSource: {
                        batch: true,
                        schema: {
                          type: "json",
                          data: "results",
                          model: {
                            id: "value",
                            fields: {
                              value: { field: "id", type: "number" },
                              text: { field: "pagetitle", type: "string" },
                            }
                          }
                        },
                        transport: {
                          read: {
                            url: "https://nevatrip.dev.compaero.ru/rest/pier/",
                            data: {
                              page: 1,
                              perPage: 0,
                              lang: "ru",
                            }
                          }
                        }
                      }
                    });

                    $("#vehicleId").kendoDropDownList({
                      dataTextField: "text",
                      dataValueField: "value",
                      dataSource: {
                        batch: true,
                        schema: {
                          type: "json",
                          data: "object",
                          model: {
                            id: "value",
                            fields: {
                              value: { field: "value", type: "number" },
                              text: { field: "text", type: "string" },
                            }
                          }
                        },
                        transport: {
                          read: {
                            url: "https://9836511c-0527-4059-ac18-7966ba3f6793.mock.pstmn.io/fake/vehicle/",
                            data: {
                              page: 1,
                              perPage: 0,
                              lang: "ru",
                            }
                          }
                        }
                      }
                    });

                    $("#sightArray").kendoMultiSelect({
                      dataTextField: "text",
                      dataValueField: "value",
                      dataSource: {
                        batch: true,
                        schema: {
                          type: "json",
                          data: "results",
                          model: {
                            id: "value",
                            fields: {
                              value: { field: "id", type: "number" },
                              text: { field: "pagetitle", type: "string" },
                            }
                          }
                        },
                        transport: {
                          read: {
                            url: "https://nevatrip.dev.compaero.ru/rest/sight/",
                            data: {
                              page: 1,
                              perPage: 0,
                              lang: "ru",
                            }
                          }
                        }
                      }
                    });

                    $("#provider").kendoDropDownList({
                      dataTextField: "text",
                      dataValueField: "value",
                      dataSource: {
                        batch: true,
                        schema: {
                          type: "json",
                          data: "results",
                          model: {
                            id: "value",
                            fields: {
                              value: { field: "id", type: "number" },
                              text: { field: "name", type: "string" },
                            }
                          }
                        },
                        transport: {
                          read: {
                            url: "https://nevatrip.dev.compaero.ru/rest/vendor/",
                            data: {
                              page: 1,
                              perPage: 0,
                              lang: "ru",
                            }
                          }
                        }
                      }
                    });

                    let event = JSON.stringify( e.event );

                    $('#grid-ticket').kendoGrid({
                      dataSource: new kendo.data.DataSource({
                        pageSize: 6,
                        data: e.event.tickets,
                        autoSync: true,
                        schema: {
                          model: {
                            id: "MIGX_id",
                            fields: {
                              MIGX_id: { editable: false, nullable: true },
                              name: { defaultValue: "Взрослый", validation: { required: true } },
                              description: { defaultValue: "" },
                              price: { validation: { required: true } },
                              count: { editable: true, type: "number", validation: { min: 1 }, defaultValue: 1 },
                              buyed: { editable: false, type: "number", defaultValue: 0 },
                              required: { editable: true },
                            }
                          }
                        }
                      }),
                      pageable: false,
                      toolbar: ["create"],
                      columns: [
                        { field: "name",title: "Билет" },
                        { field: "price", title: "Стоимость", format: "{0:c}" },
                        { field: "count", title: "Кол-во пассажиров" },
                        { field: "required", title: "Основной" },
                        { field: "description", title: "Описание" },
                        { field: "buyed", title: "Продано" },
                        { command: "destroy", title: " ", width: 120 }
                      ],
                      editable: true
                    });

                    $('#grid-additional').kendoGrid({
                      dataSource: new kendo.data.DataSource({
                        pageSize: 6,
                        data: e.event.additional,
                        autoSync: true,
                        schema: {
                          model: {
                            id: "productID",
                            fields: {
                              productID: { editable: false, nullable: true },
                              productName: { defaultValue: "Товар", validation: { required: true } },
                              description: { defaultValue: "" },
                              price: { type: "number", validation: { required: true, min: 0 } }
                            }
                          }
                        }
                      }),
                      pageable: false,
                      toolbar: ["create"],
                      columns: [
                        { field:"productName",title:"Товар" },
                        { field: "price", title:"Стоимость", format: "{0:c}" },
                        [{ command: "destroy", title: " " },{ command: "edit", title: " " }]
                      ],
                      editable: true
                    });
                  },
                  save: function(e) {
                    let tickets = $('#grid-ticket').data("kendoGrid").dataSource.data();
                    let additional = $('#grid-additional').data("kendoGrid").dataSource.data();
                    e.event.tickets = tickets;
                    e.event.additional = additional;
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
                        url: "https://nevatrip.dev.compaero.ru/rest/tour/${ tour.id }/trip/getlist?deleted=false",
                        dataType: "json"
                      },
                      update: {
                        url: "https://nevatrip.dev.compaero.ru/rest/tour/${ tour.id }/trip/update",
                        dataType: "json",
                        type: "POST"
                      },
                      create: {
                        url: "https://nevatrip.dev.compaero.ru/rest/tour/${ tour.id }/trip/create",
                        dataType: "json",
                        type: "POST"
                      },
                      destroy: {
                        url: "https://nevatrip.dev.compaero.ru/rest/tour/${ tour.id }/trip/delete",
                        dataType: "json",
                        type: "POST"
                      },
                      parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                          return {models: kendo.stringify(options.models)};
                        }
                      }
                    },
                    filter: { field: "deleted", operator: "neq", value: true },
                    schema: {
                      data: "object",
                      model: {
                        id: "taskId",
                        fields: {
                          taskId               : { from: "id"                      , type: "number"  ,                                                                                 },
                          tourId               : { from: "parent"                  , type: "number"  , defaultValue: tourDefault.id                   ,                                },
                          title                : { from: "pagetitle"               ,                   defaultValue: tourDefault.name                 , validation: { required: true } },
                          start                : { from: "tv_tripDateTimeStart"    , type: "date"    ,                                                                                 },
                          end                  : { from: "tv_tripDateTimeEnd"      , type: "date"    ,                                                                                 },
                          isAllDay             : { from: "tv_isAllDay"             , type: "boolean" ,                                                                                 },
                          recurrenceId         : { from: "tv_recurrenceID"         ,                                                                                                   },
                          recurrenceRule       : { from: "tv_recurrenceRule"       ,                                                                                                   },
                          recurrenceException  : { from: "tv_recurrenceException"  ,                                                                                                   },
                          startTimezone        : { from: "tv_startTimezone"        ,                                                                                                   },
                          endTimezone          : { from: "tv_endTimezone"          ,                                                                                                   },
                          description          : { from: "description"             ,                   defaultValue: tourDefault.description          ,                                },
                          pierStartId          : { from: "tv_pierStartId"          , type: "number"  , defaultValue: tourDefault.pierStartId          ,                                },
                          pierFinishId         : { from: "tv_pierFinishId"         , type: "number"  , defaultValue: tourDefault.pierFinishId         ,                                },
                          ticketType           : { from: "tv_ticketType"           ,                   defaultValue: tourDefault.ticketType           ,                                },
                          mapUrl               : { from: "tv_mapURL"               ,                   defaultValue: tourDefault.mapUrl               ,                                },
                          tripDirection        : { from: "tv_tripDirection"        ,                   defaultValue: tourDefault.tripDirection        ,                                },
                          vehicleId            : { from: "tv_vehicleId"            ,                   defaultValue: tourDefault.vehicleId            ,                                },
                          vehicleFeaturesArray : { from: "tv_vehicleFeaturesArray" ,                   defaultValue: tourDefault.vehicleFeaturesArray ,                                },
                          sightArray           : { from: "tv_sightArray"           ,                   defaultValue: tourDefault.sightArray           ,                                },
                          langArray            : { from: "tv_langArray"            ,                   defaultValue: tourDefault.langArray            ,                                },
                          tipBuy               : { from: "tv_tipBuy"               ,                   defaultValue: tourDefault.tipBuy               ,                                },
                          tipTicket            : { from: "tv_tipTicket"            ,                   defaultValue: tourDefault.tipTicket            ,                                },
                          buyTime              : { from: "tv_buyTime"              ,                   defaultValue: tourDefault.buyTime              ,                                },
                          buyDay               : { from: "tv_buyDay"               ,                   defaultValue: tourDefault.buyDay               ,                                },
                          tagArray             : { from: "tv_tags"                 ,                   defaultValue: tourDefault.tagArray             ,                                },
                          ticketPrint          : { from: "tv_ticketPrint"          , type: "number"  ,                                                                                 },
                          seatsCount           : { from: "tv_seatsCount"           , type: "number"  , defaultValue: 0                                ,                                },
                          provider             : { from: "vendor"                  , type: "number"  , defaultValue: tourDefault.provider             ,                                },
                          tickets              : { from: "tv_e_tickets"            ,                   defaultValue: tourDefault.tickets              ,                                },
                          additional           : { from: "tv_added_products"       ,                                                                                                   },
                        }
                      }
                    },
                  }
                });

                function fitWidget() {
                  var widget = $("#scheduler").data("kendoScheduler");
                  var height = $(window).outerHeight();

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
            `
          }
        },
      ],
      content: {
        html: `
          <div id="scheduler"></div>
        `
      }
    }
  })
);
