Ext.define('CustomApp', {
                extend: 'Rally.app.App',
                componentCls: 'app',
            
                launch: function() {
                    var millisecondsInDay = 86400000;            
                    var currentDate = new Date();
                    var startDate = new Date(currentDate - millisecondsInDay);
                    var startDateUTC = startDate.toISOString();
                    
                    Rally.data.ModelFactory.getModel({
                        type: 'UserStory',
                        success: function(model) {
                            this.grid = this.add({
                                xtype: 'rallygrid',
                                itemId: 'grid',
                                model: model,
                                columnCfgs: [
                                    'FormattedID',
                                    'Name',
                                    'Owner',
                                    'LastUpdateDate'
                                ],
                                storeConfig: {
                                    filters: [
                                        {
                                            property: 'LastUpdateDate',
                                            operator: '>',
                                            value: startDateUTC
                                        }
                                    ]
                                }
                            });
                        },
                        scope: this
                    });
                    console.log('items updated since', startDateUTC);
                }

            });