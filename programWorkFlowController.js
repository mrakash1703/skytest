kjvnsdjvsd
svndfpsdvjsd

angular.module('loyalApp')
	.controller('programWorkFlowController', programWorkFlowController);

kjabjsdvnlksdv sdkvsivdsnkdckjsd
SDVJDVSDLV

SVJSVKJSDV

programWorkFlowController.$inject = ['$scope', '$rootScope', '$filter', '$location',
	'WebService', 'WorkflowService', '$q', '$uibModal', 'uiPopupFactory',
	'dataService', 'Folders', 'WorkflowList', 'uiAddPopupFactory'];

kjsfhsvdn
sgdfklbsdnvsdmvkdljvj.
sddvkbdvdfnvnk
lsdnvosvh;osdv
svjdhodvsdvdvb
sdvsdhvoslvknsdvlv


function programWorkFlowController($scope, $rootScope, $filter, $location, WebService,
	WorkflowService, $q, $uibModal, uiPopupFactory, dataService, Folders, Folders, Folders,
	WorkflowList, uiAddPopupFactory) {
	if ($rootScope.SessionTokenId != null || $rootScope.SessionTokenId != undefined) {
		$scope.username = $rootScope.SessionTokenId.split("_")[2];
	}
	$rootScope.helpPath = "webhelp/index.html#orchestrate.html";
	console.log("creating an instance of jsplumb");
	$rootScope.diagramInstanceId = 150;
	$rootScope.connectedData = [];
	$scope.workflowType = 'accumulation';
	$scope.showWorkflow = true;
	$scope.isBoxVisible = true;
	var currentURl = dataService.skipReload().path().substr(1);
	var splitUrl = currentURl.split('/');
    $scope.programId = splitUrl[8];
    $scope.parentModuleCode=splitUrl[4];
    $scope.tacticDetail;
    $scope.accumulation = false;
    $scope.partner = false;
    $scope.redemptionprocess = false;
    $scope.redemptionproducts = false;
    $scope.servicelevel = false;
    $scope.tactic=false;
    $scope.headersList = [];
	$rootScope.$on("loadAccumulations", function() {
		loadAccumulationList();
	});



	$rootScope.$on("loadEvents", function() {
		loadEventWorkflowsList(); 
	});

	$rootScope.$on("loadReferal", function() {
		loadReferalWorkflowsList();
	});
	
	initWorkflowListController();
	
	function initWorkflowListController() {	
	 getModuleCode().then(function() {
     return getMenus();
    }).then(function() {
       
    }).catch(function(reason) {
       
    });
		}
	
    
    $scope.cancel = function() {		
        jConfirm('Are you sure you want to close the property sheet confirm once?', 'Confirm',
            function(confirmed) {
                if (confirmed) {
                   $scope.showPropertyData=!$scope.showPropertyData; 
                }
            });	
	};
	
	loadProgramName();
	loadExecutionUrl();
	
	
	function getModuleCode(){
	  return new Promise(function(resolve, reject) {
	    $scope.modulecode = [];
	    
        var data = {
            "wsCode": "",
            "columnList": ["*"],
            "keyColumn": "amdcode",
            "tableNameList": ["adm_modules"],
            "filtersList": [],
            "joinsList": [],
            "moduleCode": "",
            "objectCode": "",
            "csrfToken": $rootScope.SessionTokenId
        };

        var url = "orchestrator/getData";

        WebService.addData(url, data).then(function(response) {
			$scope.loading=false;
          for (var i = 0; i < response.length; i++) {
				if($scope.parentModuleCode==response[i].columnList.amdparentmodulecode){
					$scope.linkamdcodeValue=response[i].columnList.amdcode;
					console.log(response[i].columnList.linkamdcode);
				}
				
               }
               resolve();
              
           
        })['catch'](function(reason) {
			$scope.loading=false;
            $rootScope.error = reason;
            jAlert(reason.failure || "Something went wrong on loading permissions kindly check");
           
        });
        });
			
		}
	function getMenus(){
		return new Promise(function(resolve, reject) {
	    $scope.menus = [];
        var data = {
            "wsCode": "",
            "columnList": ["*"],
            "keyColumn": "",
            "tableNameList": ["adm_modules"],
            "filtersList": [],
            "joinsList": [],
            "moduleCode": "",
            "objectCode": "",
            "csrfToken": $rootScope.SessionTokenId
        };

        var url = "orchestrator/getData";

        WebService.addData(url, data).then(function(response) {
            for (var i = 0; i < response.length; i++) {
				if($scope.linkamdcodeValue==response[i].columnList.amdparentmodulecode | workflow demo | $work){
				   $scope.menus.push(response[i].columnList.amdcode);
				}
				
               }
               console.log($scope.menus);
               loadPermissions($scope.menus);
               resolve();
        })['catch'](function(reason) {
            $rootScope.error = reason;
            jAlert(reason.failure || "Something went wrong on loading permissions demosa");
            reject();
        });
        });
        
	}
	function loadPermissions(permissionCode) {
        $scope.permissiontype = [];

        var data = {
            "wsCode": "",
            "columnList": ["*"],
            "keyColumn": "",
            "tableNameList": ["adm_group_permissions"],
            "filtersList": [],
            "joinsList": [],
            "moduleCode": "",
            "objectCode": "",
            "csrfToken": $rootScope.SessionTokenId
        };

        var url = "orchestrator/getData";

        WebService.addData(url, data).then(function(response) {
           for (var i = 0; i < response.length; i++) {
            for (var j = 0; j < permissionCode.length; j++) {
                if (splitUrl[5] == response[i].columnList.agpagrcode && response[i].columnList.agpapncode == permissionCode[j]) {
                    $scope.permissiontype.push(response[i].columnList.agpapncode);
                     
                }
            }
        }
            console.log($scope.permissiontype);
            loadHeaderList($scope.permissiontype)
        })['catch'](function(reason) {
            $rootScope.error = reason;
            jAlert(reason.failure || "Something went wrong on loading permissions flow akash, Something work");
        });
    }

    function loadHeaderList(permissiontype) {
		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["adm_modules"],
			"filtersList": [],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			for (var i = 0; i < response.length; i++) {
	            if (permissiontype.includes(response[i].columnList.amdcode)) {
	                $scope.headersList.push({ "header": response[i].columnList.amdshortname, "open": true, "amdsortorder": response[i].columnList.amdsortorder });
	            }
        }
         console.log($scope.headersList);
		});
	}



	function loadProgramName() {
		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["loy_program"],
			"filtersList": ["prg_id=" + $scope.programId],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			$scope.programFormData = response[0].columnList;
			$scope.programName=$scope.programFormData.prg_short_name[0].toUpperCase()+$scope.programFormData.prg_short_name.slice(1)

		});


	}
	
	
	// to get execution url from spark
	//demowork space work ever
	function  loadExecutionUrl() {
		
		WebService.GetData("orchestrator/getExecutionLink").then(
				function(data) {
					$scope.executionUrl = data.exeUrl;
					console.log( data.exeUrl)
				});
	};

	/*$scope.getProgramDetail = function() {
		$scope.showServicelevel = false;
		$scope.accumulationWorkflow = false;
		$scope.programHeader = true;
		$scope.workflowchart = false;
		$scope.showredemptionprod = false;

		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["loy_program"],
			"filtersList": ["prg_id=" + $scope.programId],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			$scope.programDetails = response[0].columnList;
		});
	}*/

	$scope.setActiveItem = function(col, type) {
    $scope.selectedItem = col;

    // Helper function to capitalize the first letter of a string
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    switch (type) {
        case 'Accumulation':
            $scope.breadCrumbs = type + ' - ' +capitalizeFirstLetter(col.wfd_short_name);
            break;
        case 'Service Level':
            $scope.breadCrumbs = type + ' - ' + capitalizeFirstLetter(col.slv_short_name);
            break;
        case 'Partners':
        case 'Redemption Partners':
            $scope.breadCrumbs = type + ' - ' + capitalizeFirstLetter(col.org_name);
            break;
        case 'Redemption Process':
            $scope.breadCrumbs = type + ' - ' + capitalizeFirstLetter(col.ldp_name);
            break;
        case 'Tactic':
        case 'Interactive':
        case 'Referal':
            $scope.breadCrumbs = type + ' - ' + capitalizeFirstLetter(col.wfd_short_name);
            break;
        default:
            $scope.breadCrumbs = "Accumulation";
            break;
    }

    // Specific handling for ServiceLevel
    if (type === 'ServiceLevel') {
        $scope.breadCrumbs = type + ' - ' + capitalizeFirstLetter(col.slv_short_name);
    }
};


	var instance;


	$scope.oneAtATime = false;
	$scope.status = {
		isOpen: [true]
	};

	$scope.boxTypes = [{
		type: 'S'

	}]


	/*$scope.headersList = [
		{
			"header": "ServiceLevel",
			"open": true
		},
		{
			"header": "Program Partners",
			"open": true
		},
		{
			"header": "Accumulation",
			"open": true
		},
		{
			"header": "Tactic",
			"open": false
		},
		{
			"header": "Redemption Process",
			"open": false
		},
		{
			"header": "Redemption Products",
			"open": false
		},
		//			                  {
		//			                     "header": "Interactive",
		//		                         "open" : false
		//			                  },
		{
			"header": "Referral",
			"open": false
		},
	];
*/

	//loadServiceLevelList();
	/*loadRedemptionProcessList();*/
	loadAccumulationList();
	loadEventWorkflowsList();
	loadReferalWorkflowsList();
	initServiceLevelController();

	$rootScope.$on("loadServiceLevelList", function() {
		initServiceLevelController();
	});

	function initServiceLevelController() {
		loadServiceLevelList();
	}
	function loadServiceLevelList() {
		$scope.serviceLevelListHeader = [];
		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["loy_service_level"],
			"filtersList": ["slv_prg_id=" + $scope.programId],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response1) {
			for (var i = 0; i < response1.length; i++) {
				$scope.serviceLevelListHeader.push(response1[i].columnList);
			}
			if($scope.serviceLevelListHeader.length==0){
				 $scope.showProgramDetails();
			}
			
			$scope.slv_levelId = $scope.serviceLevelListHeader.length + 1;
			$scope.slv_code = $scope.serviceLevelListHeader.slv_code;
		});
	}



	function loadAccumulationList(action) {

		$scope.accumulationProcessList = [];
		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["wfl_diagrams_eng"],
			"filtersList": ["wfd_diagram_input=170", "wfd_program_id=" + $scope.programId,sdfgwuf "akjefdhfwejkfwv"],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			for (var i = 0; i < response.length; i++) {
				$scope.accumulationProcessList.push(response[i].columnList);
			}
			if(action=="delete" && $scope.showWorkflow){
				$scope.getConnectedData($scope.accumulationProcessList[$scope.accumulationProcessList.length-1].wfd_id,"accumulation", fgwefuwefh "efiwef")
				
			}

		});
	}

	function loadEventWorkflowsList(action) {
		$scope.eventWorkflowsList = [];
		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["wfl_diagrams_eng"],
			"filtersList": ["wfd_diagram_input=210","wfd_program_id=" + $scope.programId],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			for (var i = 0; i < response.length; i++) {
				$scope.eventWorkflowsList.push(response[i].columnList);
			}
			if(action=="delete" && $scope.showWorkflow){
				$scope.getConnectedData($scope.eventWorkflowsList[$scope.eventWorkflowsList.length-1].wfd_id,"event")
				
			}
		});
	}

	function loadReferalWorkflowsList(action) {

		$scope.referalWorkflowsList = [];
		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["wfl_diagrams_eng"],
			"filtersList": ["wfd_diagram_input=220","wfd_program_id=" + $scope.programId],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			for (var i = 0; i < response.length; i++) {
				$scope.referalWorkflowsList.push(response[i].columnList);
			}
			if(action=="delete" && $scope.showWorkflow){
				$scope.getConnectedData($scope.referalWorkflowsList[$scope.referalWorkflowsList.length-1].wfd_id,"referral",aofhfjcwnef "aefhweoig")
			
			}
		});
	}

	initProgramPartnerController();
	$rootScope.$on("loadProgramPartnerList", function() {
		initProgramPartnerController();
	});
	function initProgramPartnerController() {
		loadPartner();
	}


	function loadPartner() {
		$scope.partner=[];
		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["loy_program_partner"],
			"filtersList": ["ptn_prg_id=" + $scope.programId],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			for (var i = 0; i < response.length; i++) {
				$scope.partner.push(response[i].columnList);
				loadProgramPartners(response[i].columnList.ptn_org_id);
			}

		});
	}

	function loadProgramPartners(orgId) {
		$scope.programPartnerList = [];
		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["loy_partner_organizations"],
			"filtersList": ["org_id=" + orgId],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			for (var i = 0; i < response.length; i++) {
				$scope.programPartnerList.push(response[i].columnList);
			}
			if($scope.programPartnerList.length==0){
				 $scope.showProgramDetails();
			}
		});
	}

	initRedemptionProcessController();
	$rootScope.$on("loadRedemptionProces", function() {
		initRedemptionProcessController();
	});
	function initRedemptionProcessController() {
		loadRedemptionProcessList();
	}

	function loadRedemptionProcessList() {
		$scope.redemptionProcessList = [];
		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["loy_redemption_process"],
			"filtersList": ["ldp_prg_id=" + $scope.programId],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			for (var i = 0; i < response.length; i++) {
				$scope.redemptionProcessList.push(response[i].columnList);
			}
			if($scope.redemptionProcessList.length==0){
				 $scope.showProgramDetails();
			}
		});
	}
	

	/* Redemption Products */
	function loadRedemptionProduList() {
		$scope.redemptionProductList = [];
		var data = {
			"wsCode": "",
			"columnList": ["*"],
			"keyColumn": "",
			"tableNameList": ["loy_prog_redemption_products"],
			"filtersList": ["ldp_prg_id=" + $scope.programId],
			"joinsList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId
		};
		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			for (var i = 0; i < response.length; i++) {
				$scope.redemptionProductList.push(response[i].columnList);
			}
		});
	}





	WorkflowService.setScopeForCanvas();


	$scope.onDrop = function(event, ui) {
		var i = 0;
		var el = angular.element(this)[i];
		WorkflowService.onDropBox(event, ui, instance, el, $scope);
		$rootScope.$digest(function() {
		});

	}

	$scope.updateBox = function() {
	}
	$scope.showProgramDetails = function() {
		$scope.showWorkflow = false;
		$scope.templateUrl = CJApp.templatePath + '/programs/viewProgram.html';
		$scope.showPropertyData = true;
		$scope.isWorkflow = true;
		$scope.isBoxVisible = false;
	}
	$scope.addServiceLevel = function(slvData, idx) {
		$scope.showWorkflow = false;
		$scope.showServicelevel = true;
		$scope.isBoxVisible = false;
		$scope.isTierUpgradeDisable;
		$scope.isTierDownpgradeDisable;
		$scope.currentId = slvData;
		var arrPosition;
		$scope.cancel = function() {
			/*$scope.showWorkflow = true;*/
			$scope.showServicelevel = false;
			$scope.showProgramDetails();

		}
		if ($scope.serviceLevelListHeader.length == 0 || idx == 0) {
			arrPosition = 'first';
		}
		else if (idx == $scope.serviceLevelListHeader.length - 1) {
			arrPosition = 'last';
		}
		else {
			arrPosition = 'middle'
		}
		$scope.isTierUpgradeDisable = arrPosition == 'last' ? true : false;
		$scope.isTierDownpgradeDisable = arrPosition == 'first' ? true : false;
		//$scope.currentSlvZode=serviceLevelData.slv_code;	
		$scope.templateUrl = CJApp.templatePath + '/programs/servicelevel/addServicelevel.html';
		$scope.showPropertyData = true;
		$scope.serviceLevelFormData = {};
		$scope.upGradeTierRewards = [];
		$scope.downGradeTierRewards = [];
		$scope.retentionRewards = [];
		$scope.rewardStrategies = [];
		
		/*$scope.serviceLevelFormData.slv_prg_id=$scope.programId;
		$scope.serviceLevelFormData.slv_id='';
		$scope.serviceLevelFormData.slv_balance_count_frequncy='';
		$scope.serviceLevelFormData.slv_stmt_frequency='';
		$scope.serviceLevelFormData.createuser='';
		$scope.serviceLevelFormData.updateuser='';
		$scope.serviceLevelFormData.createdate='';
		$scope.serviceLevelFormData.updatedate='';
		$scope.serviceLevelFormData.lastmodified='';
		$scope.serviceLevelFormData.slv_ptn_org_id='';
		$scope.serviceLevelFormData.slv_level='';
		$scope.serviceLevelFormData.slv_upgrade_notification_msg_id='';
		$scope.serviceLevelFormData.slv_downgrade_notification_msg_id='';
		$scope.serviceLevelFormData.slv_retention_notification_msg_id='';*/
		if ($scope.currentId) {
			loadServiceLevelEditData();
		}
		else{
			$scope.serviceLevelFormData= {
						"slv_id": "",
						"slv_prg_id": $scope.programId,
						"slv_balance_count_frequncy": "",
						"slv_stmt_frequency": "",
						"slv_ptn_org_id": "",
						"slv_level": $scope.serviceLevelListHeader.length + 1,
						"slv_upgrade_notification_msg_id": "",
						"slv_downgrade_notification_msg_id": "",
						"slv_retention_notification_msg_id": "",
						"createdate": "",
						"createuser": "",
						"updatedate": "",
						"updateuser": "",
						"lastmodified": "",
					}
						if($scope.serviceLevelListHeader.length>0){
						var previousServiceLevel = $scope.serviceLevelListHeader[$scope.serviceLevelListHeader.length - 1];
						$scope.serviceLevelFormData.slv_next_lower_slv_level = previousServiceLevel.slv_code;
					}
		}
		loadServiceLevelDetails();
		/*loadServiceLevelList();*/
		loadTierMovement();
		loadNotificationTemplates();
		loadRewardStrategies();
		//uiAddPopupFactory.open(templateUrl, "addServicelevelController","add", "sm", 'static','Service Level','list',slvData,"Service Level",{'program_Id':$scope.programId,'position':arrPosition});
		function loadServiceLevelEditData() {
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"keyColumn": "",
				"tableNameList": ["loy_service_level"],
				"filtersList": ["slv_id=" + $scope.currentId],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.serviceLevelFormData = response[i].columnList;
				}
			    $scope.getTierMovementAttributes($scope.serviceLevelFormData.slv_tier_movement_based_on,$scope.serviceLevelFormData.slv_tier_movement_attributes);
			    //$scope.getTierMovementAttributes($scope.serviceLevelFormData.slv_tier_movement_attributes);
				//$scope.serviceLevelFormData.slv_level=$scope.slv_levelId;
			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to get edit");
			});
		}
		$scope.getTierMovementAttributes = function(tier) {
			$scope.tierMovementAttributes = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["bas_lookup_details"],
				"filtersList": ["DLD_DLK_LOOKUP_NAME=" + tier],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.tierMovementAttributes.push(response[i].columnList);
				}

			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to add tier movements attributes");
			});
		}
		
	
		function loadServiceLevelList() {
			$scope.serviceLevelListHeader = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"keyColumn": "",
				"tableNameList": ["loy_service_level"],
				"filtersList": ["slv_prg_id=" + $scope.programId],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response1) {
				for (var i = 0; i < response1.length; i++) {
					$scope.serviceLevelListHeader.push(response1[i].columnList);
				}
				//$scope.serviceLevelFormData.slv_level = $scope.serviceLevelListHeader.length + 1;
				//$scope.formData.slv_level=$scope.slv_levelId;
			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to get service levels");
			});
		}

		function loadNotificationTemplates() {
			$scope.notificationTemplates = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["loy_notification_template"],
				"filtersList": [],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.notificationTemplates.push(response[i].columnList);
				}

			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to get notification templates");
			});
		}
		function loadServiceLevelDetails() {
			$scope.serviceLevelList = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["bas_lookup_details"],
				"filtersList": ["DLD_DLK_LOOKUP_NAME=SLV_CODE"],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.serviceLevelList.push(response[i].columnList);
				}

			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to get service level details");
			});
		}
		/*load all rewards strategies*/
		function loadRewardStrategies() {
			$scope.rewardStrategies = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["loy_reward_strategies"],
				"filtersList": [],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.rewardStrategies.push(response[i].columnList);
				}

			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to load rewards strategies");
			});
		}
		/*for getting tier movement*/
		function loadTierMovement() {
			$scope.tierMovements = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["bas_lookup_details"],
				"filtersList": ["DLD_DLK_LOOKUP_NAME=Tier_Movement"],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.tierMovements.push(response[i].columnList);
				}

			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to add tier movements");
			});
		}
		/*get tier movement attributes*/
		$scope.getTierMovementAttributes = function(tier,tier2) {
			$scope.tierMovementAttributes = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["bas_lookup_details"],
				"filtersList": ["DLD_DLK_LOOKUP_NAME=" + tier],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.tierMovementAttributes.push(response[i].columnList);
				}
                $scope.serviceLevelFormData.slv_tier_movement_attributes=tier2;
			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to add tier movements attributes");
			});
		}
		/*add tier upgrade*/

		/*get tier rewards*/
		$scope.getUpgradeTierRewards = function() {
			$scope.upGradeTierRewards = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["loy_service_reward_strategy"],
				"filtersList": ["lsr_slv_code=" + $scope.serviceLevelFormData.slv_code, "lsr_tier_type='upgrade'"],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				if (response.length > 0) {
					for (var i = 0; i < response.length; i++) {
						$scope.upGradeTierRewards.push(response[i].columnList);
					}
				}

			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to get tier movements");
			});
		}

		/*for getting downgrade tier rewards*/
		$scope.getDowngradeTierRewards = function() {
			$scope.downGradeTierRewards = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["loy_service_reward_strategy"],
				"filtersList": ["lsr_slv_code=" + $scope.serviceLevelFormData.slv_code, "lsr_tier_type='downgrade'"],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				if (response.length > 0) {
					for (var i = 0; i < response.length; i++) {
						$scope.downGradeTierRewards.push(response[i].columnList);
					}
				}

			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to get tier movements");
			});
		}

		/*for getting retention tier rewards*/
		$scope.getRetentionTierRewards = function() {
			$scope.retentionTierRewards = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["loy_service_reward_strategy"],
				"filtersList": ["lsr_slv_code=" + $scope.serviceLevelFormData.slv_code, "lsr_tier_type='retention'"],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				if (response.length > 0) {
					for (var i = 0; i < response.length; i++) {
						$scope.retentionTierRewards.push(response[i].columnList);
					}
				}
			})['catch'](function(reason) {
				$scope.error = reason;
				jAlert("Failed to get tier movements");
			});
		}


		$scope.addUpGradeTierReward = function() {
			var upObj = {
				"lsr_id": "",
				"lsr_slv_code": $scope.serviceLevelFormData.slv_code,
				"lsr_lrs_id": "",
				"lsr_start_date": "",
				"lsr_active_flag": "A",
				"lsr_end_date": "",
				"lsr_prg_id": $scope.programId,
				"lsr_tier_type": 'upgrade'
			};
			$scope.upGradeTierRewards.push(upObj)
		}

		$scope.addDownGradeTierReward = function() {
			var dObj = {
				"lsr_id": "",
				"lsr_slv_code": $scope.serviceLevelFormData.slv_code,
				"lsr_lrs_id": "",
				"lsr_start_date": "",
				"lsr_active_flag": "A",
				"lsr_end_date": "",
				"lsr_prg_id": $scope.programId,
				"lsr_tier_type": 'downgrade'
			};
			$scope.downGradeTierRewards.push(dObj)
		}

		$scope.addRetentionTierReward = function() {
			var rObj = {
				"lsr_id": "",
				"lsr_slv_code": $scope.serviceLevelFormData.slv_code,
				"lsr_lrs_id": "",
				"lsr_start_date": "",
				"lsr_active_flag": "A",
				"lsr_end_date": "",
				"lsr_prg_id": $scope.programId,
				"lsr_tier_type": 'retention'
			};
			$scope.retentionTierRewards.push(rObj)
		}
		$scope.submit = function() {
			$scope.serviceLevelFormData.lastmodified = "";
			var url = "orchestrator/saveDetails"
			var data =
			{
				"wsCode": "",
				"action": $scope.currentId ? "U" : "I",
				"tableName": "loy_service_level",
				"keyColumn": "slv_id",
				"keyValue": $scope.currentId ? $scope.currentId : "",
				"columnValueMap": [$scope.serviceLevelFormData],
				"columnDataTypeMap": {
					"slv_id": "N",
					"slv_prg_id": "N",
					"createuser": "S",
					"updateuser": "S",
					"createdate": "D",
					"updatedate": "D",
					"lastmodified": "T",
					"slv_code": "S",
					"slv_short_name": "S",
					"slv_long_name": "S",
					"slv_next_lower_slv_level": "S",
					"slv_next_higher_slv_level": "S",
					"slv_min_value": "N",
					"slv_max_value": "N",
					"slv_period_length": "N",
					"slv_balance_count_frequncy": "N",
					"slv_stmt_frequency": "N",
					"slv_upgrade_notification_flag": "S",
					"slv_downgrade_notification_flag": "S",
					"slv_retention_notification_flag": "S",
					"slv_upgrade_notification_msg_id": "N",
					"slv_downgrade_notification_msg_id": "N",
					"slv_retention_notification_msg_id": "N",
					"slv_tier_movement_attributes": "S",
					"slv_tier_movement_based_on": "S",
					"slv_ptn_org_id": "N",
					"slv_level": "N"
				},
				"whereList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId,
				"childGetBean": []
			}

			console.log(JSON.stringify(data));
			WebService
				.addData(url, data)
				.then(
					function(response) {
						jAlert("Service level add/updated successfully");
						//$uibModalInstance.close();
						//$rootScope.$emit("loadServiceLevelList");
						$scope.serviceLevelFormData.slv_id = response.keyValue;
						initServiceLevelController();
					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert("Failed to add/update service level");
					});
		}


	}

	$scope.tierSubmit = function(type) {
		var tdata;
		if (type == "upgrade") {
			tdata = JSON.parse(angular.toJson($scope.upGradeTierRewards))
		}
		else if (type == "downgrade") {
			tdata = JSON.parse(angular.toJson($scope.downGradeTierRewards))
		}
		else {
			tdata = JSON.parse(angular.toJson($scope.retentionTierRewards))
		}
		var url = "orchestrator/saveDetails";
		var data =
		{
			"wsCode": "",
			"action": "IU",
			"tableName": "loy_service_reward_strategy",
			"keyColumn": "lsr_id",
			"keyValue": "",
			"columnValueMap": tdata,
			"columnDataTypeMap": {
				"lsr_id": "N",
				"lsr_slv_code": "S",
				"lsr_lrs_id": "N",
				"lsr_start_date": "D",
				"lsr_active_flag": "S",
				"lsr_end_date": "D",
				"lsr_prg_id": "N",
				"lsr_tier_type": "S"
			},
			"whereList": [],
			"moduleCode": "",
			"objectCode": "",
			"csrfToken": $rootScope.SessionTokenId,
			"childGetBean": []
		}
		WebService
			.addData(url, data)
			.then(
				function(response) {
					jAlert("Tier " + type + " rewards added successfully");
					console.log(response);
					$rootScope.$emit("loadServiceLevelList");
				})['catch'](function(reason) {
					$scope.error = reason;
					jAlert("Failed to add " + type + " rewards");
				});
	}



	$scope.addProgramPartners = function(organizationId,index) {
		$scope.showWorkflow = false;
		$scope.showPartner=false;
		$scope.isBoxVisible = false;
		$scope.templateUrl = CJApp.templatePath + '/programs/programpartners/addProgramPartner.html';
		//uiAddPopupFactory.open(templateUrl, "addProgramPartnersController","add", "sm", 'static','Program Partner','list',organizationId,"Program Partner",{'program_Id':$scope.programId});
		$scope.currentId = organizationId;
		$scope.programPartnerFormData = {};
		loadPartnerNames();
		$scope.currentIndex=index;
		$scope.cancel = function() {
			$scope.showPartner=true;
			/*$scope.showWorkflow = true;*/
			$scope.showProgramDetails();
		};
		if (organizationId != "") {
			loadPartnerEditData();
		}
		function loadPartnerEditData() {
		        var data = {
		            "wsCode": "",
		            "columnList": ["*"],
		            "tableNameList": ["loy_program_partner"],
		            "filtersList": ["ptn_prg_id=" + $scope.programId],
		            "joinsList": [],
		            "moduleCode": "",
		            "objectCode": "",
		            "csrfToken": $rootScope.SessionTokenId
		        };
		        var url = "orchestrator/getData";
		        WebService.addData(url, data).then(function (response) {
		            for (var i = 0; i < response.length; i++) {
						if(response[i].columnList.ptn_org_id==organizationId){
							 $scope.programPartnerFormData = response[i].columnList;
						}
						
						Object.keys($scope.programPartnerFormData).forEach(function (key) {                         
							if ($scope.programPartnerFormData[key] === null || $scope.programPartnerFormData[key] === "null") {                             // Set null or "null" values to an empty string                            
								$scope.programPartnerFormData[key] = ""; 
								} 
							});
		               
		            }
		           
		        }).catch(function (error) {
		           
		        });
		   
		}
		
//		function loadPartnerDetails() {
//		    return new Promise(function (resolve, reject) {
//		        var url = "orchestrator/getPartenerDetails/" + $scope.currentId;
//		        WebService.GetData(url).then(function (response) {
//		            for (var i = 0; i < response.length; i++) {
//		                $scope.partnerPrgId = response[i].columnList.PTN_LPP_ID;
//		            }
//		            resolve();  
//		        }).catch(function (error) {
//		            reject(error); 
//		        });
//		    });
//		}

		function loadPartnerNames() {
			$scope.partnersList = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["loy_partner_organizations"],
				"filtersList": [],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.partnersList.push(response[i].columnList);
				}

			});
		}

		$scope.showCalendar = function(type) {
			if (type == 'startdate') {
				if ($scope.startdatevisibility) {
					$scope.startdatevisibility = false;
				} else {
					$scope.startdatevisibility = true;
				}
			} else if (type == 'enddate') {
				if ($scope.enddatevisibility) {
					$scope.enddatevisibility = false;
				} else {
					$scope.enddatevisibility = true;
				}
			} else {
				$scope.startdatevisibility = false;
				$scope.enddatevisibility = false;
			}
		}

		$scope.minDate = new Date().toDateString();
		$scope.maxDate = new Date().toDateString();

		$scope.updateDate = function(ndate) {
			$scope.startdate = ndate;
			$scope.programPartnerFormData.ptn_start_date = ndate;
			$scope.startdatevisibility = false;
			var d = new Date(ndate);
			d.setDate(d.getDate() + 1);
			var maxdate = d.toLocaleDateString();
			var dd = d.getDate();
			if (dd < 10) {
				dd = '0' + dd;
			}
			var mm = d.getMonth() + 1;
			if (mm < 10) {
				mm = '0' + mm;
			}
			var yyyy = d.getFullYear();
			maxdate = yyyy + '-' + mm + '-' + dd;
			$scope.maxDate = maxdate;


		}
		$scope.updateEndDate = function(ndate) {
			//$scope.startdate=ndate;
			$scope.programPartnerFormData.ptn_end_date = ndate;
			$scope.enddatevisibility = false;
			//		datediff($scope.formData.prg_start_date,
			//				$scope.formData.prg_end_date);

		}
		function datediff(first, second) {

			var startDate = Date.parse(first);
			var endDate = Date.parse(second);
			var timeDiff = endDate - startDate;
			var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			if (daysDiff < 0) {

				jAlert("Please select correct start date");
			}

		}

		$scope.partnerSubmit = function() {
			 for (var i = 0; i < $scope.partner.length; i++) {
				 if($scope.partner[$scope.currentIndex] && $scope.partner[$scope.currentIndex].ptn_lpp_id){
					 $scope.keyvalue=$scope.partner[$scope.currentIndex].ptn_lpp_id;
					 $scope.programPartnerFormData.ptn_lpp_id=$scope.partner[$scope.currentIndex].ptn_lpp_id;
				 }
				 else{
					 $scope.keyvalue="";
				 }
				 }
				 
			$scope.programPartnerFormData.ptn_prg_id=$scope.programId;
			$scope.programPartnerFormData.createuser=""; 
			$scope.programPartnerFormData.updateuser="";
			$scope.programPartnerFormData.createdate="";
			$scope.programPartnerFormData.updatedate="";
			$scope.programPartnerFormData.lastmodified="";
            var url="orchestrator/saveDetails"
					var data=
							{  
							   "wsCode":"",
							   "action":$scope.keyvalue ?"U":"I",
							   "tableName":"loy_program_partner",
							   "keyColumn":"ptn_lpp_id",
							   "keyValue":$scope.keyvalue?$scope.keyvalue:"",
							   "columnValueMap":[ $scope.programPartnerFormData ],
							   "columnDataTypeMap":{  						   
									   "ptn_lpp_id":"N",
									   "ptn_org_id": "N",
									   "ptn_prg_id": "N",
									   "ptn_status": "S",
									   "ptn_start_date":"D",
						   			   "ptn_end_date":"D",
									   "createuser": "S",
									   "updateuser": "S",
									   "createdate": "D",
									   "updatedate": "D",
									   "lastmodified": "T"		 
							   },
							   "whereList":[],
							   "moduleCode":"",
							   "objectCode":"",
							   "csrfToken":$rootScope.SessionTokenId,
							   "childGetBean":[]
							}

				console.log(JSON.stringify(data));
				WebService
				.addData(url, data)
				.then(
						function(response) {	
							jAlert("Program Partner Added/edited successfully");
							$rootScope.$emit("loadProgramPartnerList");
						})['catch'](function(reason) {
								$scope.error = reason;
								jAlert("Failed to add program partner");
							});
			

		}
	}



	/*$scope.addProgramPartners = function(organizationId) {
		var templateUrl = CJApp.templatePath + '/programs/programpartners/addProgramPartner.html';
		uiAddPopupFactory.open(templateUrl, "addProgramPartnersController", "add", "sm", 'static', 'Program Partner', 'list', organizationId, "Program Partner", { 'program_Id': $scope.programId });
	}*/

	$scope.addRedemptionProcess = function(redemProdId) {
		$scope.showWorkflow = false;
		$scope.isBoxVisible = false;
		$scope.showPropertyData = true;
		$scope.templateUrl = CJApp.templatePath + '/programs/redemptionprocess/addRedemptionProcess.html';
		$scope.redemptionProcessFormData = {};
		$scope.redemptionRulesFormData = {};
		$scope.strategies = [];
		$scope.programUnit = [];
		 $scope.secondTabEnabled = false;
		$scope.currentId = redemProdId;
		$scope.redemptionProcessDetailFormData = {};
		$scope.redemptionProcessCurrencyFormData = {};
		$scope.selectedStrategies = {};
		$scope.selectedProgramUnit = [];
		$scope.selectedReedemType - [];
		$scope.reedemType = [];
		$scope.showRedemptionProcess=true;
		loadRedeemType();
		loadProgramUnit();
		loadNotificationType();
		loadRewardStrategy();
		$scope.cancel = function() {
			//$uibModalInstance.dismiss('cancel');
			$scope.showRedemptionProcess=false;
			$scope.showProgramDetails();
			
		};
		console.log($scope.currentId);
		if ($scope.currentId) {
   
        loadRedemptionDetailsEditData();
     
        loadRedemptionCurrencyEditData();
   
    loadRedemptionProcessEditData();
   }
		$scope.selected = function() {
			console.log();
		}


		function loadRedemptionProcessEditData() {
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"keyColumn": "",
				"tableNameList": ["loy_redemption_process"],
				"filtersList": ["ldp_id=" + $scope.currentId],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.redemptionProcessFormData = response[i].columnList;
					
				}
			});
		}
		function loadRedemptionDetailsEditData() {
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"keyColumn": "",
				"tableNameList": ["loy_redemption_process_details"],
				"filtersList": ["ldp_id=" + $scope.currentId],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.redemptionProcessDetailFormData = response[i].columnList;
				}
			});
		}
		function loadRedemptionCurrencyEditData() {
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"keyColumn": "",
				"tableNameList": ["loy_redemption_process_currency"],
				"filtersList": ["ldp_id=" + $scope.currentId],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.redemptionProcessCurrencyFormData = response[i].columnList;
				}
			});
		}
		//for loading reward strategies
		function loadRewardStrategy() {
			// Initialize array to store reward strategies
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"keyColumn": "",
				"tableNameList": ["loy_reward_strategies"],
				"filtersList": [],/*DLD_DLK_LOOKUP_NAME=REWARD_UNIT */
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.strategies.push(response[i].columnList);
				}
			});
		}

		function loadRedeemType() {
			// Initialize array to store reward strategies
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"keyColumn": "",
				"tableNameList": ["bas_lookup_details"],
				"filtersList": ['DLD_DLK_LOOKUP_NAME=redemption_type'],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.reedemType.push(response[i].columnList);
				}
			});
			console.log($scope.reedemType);
		}
		function loadProgramUnit() {
			// Initialize array to store reward strategies
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"keyColumn": "",
				"tableNameList": ["loy_program"],
				"filtersList": [],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					if (response[i].columnList.prg_id === $scope.programId) {
						$scope.programUnit.push(response[i].columnList);
					}
				}
			});
		}
		// Function to select all checkboxes

		//for loading notttification types
		function loadNotificationType() {
			$scope.notificationTypes = [];
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"keyColumn": "",
				"tableNameList": ["bas_lookup_details"],
				"filtersList": ['DLD_DLK_LOOKUP_NAME=AUS_NOTIFY'],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$scope.notificationTypes.push(response[i].columnList);
				}

			});
		}

			$scope.redemptionSubmit = function() {
			var strategiesColumnValueMap = {}; 
			var currencyColumnValueMap = {};
			var childDataBean = {}; 
		 
			if ($scope.redemptionProcessFormData.ldp_process_type === 'Other Rewards') {
				strategiesColumnValueMap = {
					"RPD_ID": "",
					"LDP_ID":"",
					"RPD_LRS_ID": $scope.redemptionProcessDetailFormData.rpd_lrs_id,
					"RPD_CLR_ID": "",
					"RPD_INCLUDE_FLAG": "Y"
				};
				childDataBean = {
					"wsCode": "",
					"action": "I",
					"tableName": "loy_redemption_process_details",
					"keyColumn": "RPD_ID",
					"keyValue": "",
					"columnValueMap": [strategiesColumnValueMap],
					"columnDataTypeMap": {
						"RPD_ID": "N",
						"LDP_ID": "N",
						"RPD_LRS_ID": "N",
						"RPD_CLR_ID": "N",
						"RPD_INCLUDE_FLAG": "S"
					},
					"whereList": [],
					"moduleCode": "",
					"objectCode": "",
					"csrfToken": $rootScope.SessionTokenId
				};
			} else if ($scope.redemptionProcessFormData.ldp_process_type === 'Currency') {
				currencyColumnValueMap = {
					"LDPC_ID": "",
					"LDP_ID":"",
					"LDPC_PROGRAM_UNIT": $scope.redemptionProcessCurrencyFormData.ldpc_program_unit,
					"LDPC_REDEEM_TYPE": $scope.redemptionProcessCurrencyFormData.ldpc_redeem_type,
					"LDPC_VALUE": $scope.redemptionProcessCurrencyFormData.ldpc_value,
					"LDPC_ATTRIBUTES_OF": $scope.redemptionProcessCurrencyFormData.ldpc_attributes_of
				};
				childDataBean = {
					"wsCode": "",
					"action": "I",
					"tableName": "loy_redemption_process_currency",
					"keyColumn": "ldpc_id",
					"keyValue": "",
					"columnValueMap": [currencyColumnValueMap],
					"columnDataTypeMap": {
						"LDPC_ID": "N",
						"LDP_ID": "N",
						"LDPC_PROGRAM_UNIT": "S",
						"LDPC_REDEEM_TYPE": "S",
						"LDPC_VALUE": "S",
						"LDPC_ATTRIBUTES_OF": "S"
					},
					"whereList": [],
					"moduleCode": "",
					"objectCode": "",
					"csrfToken": $rootScope.SessionTokenId
				};
			}
		 
			var url = "orchestrator/saveDetails";
			var data = {
				"wsCode": "",
				"action": $scope.currentId?"U":"I",
				"tableName": "loy_redemption_process",
				"keyColumn": "ldp_id",
				"keyValue": $scope.currentId?$scope.currentId:"",
				"columnValueMap": [$scope.redemptionProcessFormData],
				"columnDataTypeMap": {
					"ldp_id": "N",
					"ldp_prg_id": "N",
					"ldp_name": "S",
					"ldp_description": "S",
					"ldp_notification_flag": "S",
					"ldp_notification_type": "S",
					"ldp_notification_msg_id": "N",
					"ldp_failure_notification_flag": "S",
					"ldp_failure_notification_type": "S",
					"ldp_failure_msg_id": "N",
					"ldp_status": "S",
					"ldp_comments": "S",
					"ldp_process_type": "S",
					"createuser": "S",
					"createdate": "D",
					"updateuser": "S",
					"updatedate": "D",
					"lastmodified": "T",
				},
				"whereList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId,
				"childGetBean": [childDataBean]
			};
		 
			console.log(JSON.stringify(data));
			WebService
				.addData(url, data)
				.then(
					function(response) {
						jAlert("Redemption process added successfully");
						$scope.redemptionProcessFormData.ldp_id=response.keyValue;
						$rootScope.$emit("loadRedemptionProcess");
						loadRedemptionProcessList();
					})
					
				.catch(function(reason) {
					jAlert("Failed to add redemption process");
				});
		}


		//redemption rules
		/*$rootScope.$on("loadRedemptionRulesList", function() {
		initRedemptionRuleController();
	});

	function initRedemptionRuleController() {
		loadRedemptionRulesList();
	}*/
		$rootScope.parameterNames=[];
		$scope.parameterOperator=[];
		$scope.redemptionRule=[];
		$scope.redemptionRules=[];
		$scope.edit=false;
		/*loadParameterName();*/
		loadParameterOperator();
		getParameterNames();
		if ($scope.currentId) {
    loadRedemptionRulesEditData();
    }
		/*loadRedemption();*/
		
		/*$scope.$watch('$scope.redemptionProcessRulesFormData.rdp_ldp_id', function(newValue,oldValue) {			
		if(newValue != oldValue){
			$scope.redemptionRules=[{
		    	"ldr_parameter_name":'',
		    	"ldr_parameter_operator":'',
		    	"ldr_parameter_value":'',
		    	"ldr_id":"",
				"ldr_ldp_id":$scope.redemptionProcessFormData.ldp_id,
				"file_name":"",
				"file_location":""	
				}
				
			]
		}
	});*/
		
        
	$scope.addRedemptionRule = function() {
    $scope.redemptionRules.push({
        "ldr_parameter_name": '',
        "ldr_parameter_operator": '',
        "ldr_parameter_value": '',
        "ldr_id": "",
        "ldr_ldp_id": $scope.redemptionProcessFormData.ldp_id,
        "file_name": "",
        "file_location": "",
        
    });
};

       function loadParameterOperator(){	
				var data = {
						"wsCode" : "",
						"columnList" : [ "*" ],
						"tableNameList" : [ "bas_lookup_details" ],
						"filtersList" : ["DLD_DLK_LOOKUP_NAME='OPERATOR'"],
						"joinsList" : [],
						"moduleCode" : "",
						"objectCode" : "",
						"csrfToken" : $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							
                			$scope.parameterOperator.push(response[i].columnList);
            
						}
						
					})['catch'](function(reason) {
						$scope.error = reason;
					});
			}
        
       /*function getParameterNames(){
		var data = {
    			"wsCode" : "",
    			"columnList" : [ "*" ],
    			"keyColumn" : "rpid",
    			"tableNameList" : ["redemption_parameters"],
    			"filtersList" : [],
    			"joinsList" : [],
    			"moduleCode":"",
    			"objectCode" : "",
    			"csrfToken" : $rootScope.SessionTokenId
    		};
    		var url = "orchestrator/getData";
    		WebService.addData(url, data).then(
    				function(response) {
    					//$scope.parameterNames=[];
    					for (var i = 0; i < response.length; i++) {
    						$rootScope.parameterNames.push(response[i].columnList);
    					}					
    				});
	}
	*/
	function getParameterNames() {
			// Initialize array to store reward strategies
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"keyColumn": "",
				"tableNameList": ["bas_lookup_details"],
				"filtersList": ['DLD_DLK_LOOKUP_NAME=redemption_type'],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
				for (var i = 0; i < response.length; i++) {
					$rootScope.parameterNames.push(response[i].columnList);
				}
			});
			
		}
	
  /*function loadRedemptionRulesEditData() {

						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_redemption_rules"],
							"filtersList": ["ldr_ldp_id=" + redemptionProcessFormData.ldp_id],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							$scope.redemptionRules = response[0].columnList;

						});
					}*/

function loadRedemptionRulesEditData() {
			var data = {
				"wsCode": "",
				"columnList": ["*"],
				"tableNameList": ["loy_redemption_rules"],
				"filtersList": ["ldr_ldp_id=" + $scope.currentId],
				"joinsList": [],
				"moduleCode": "",
				"objectCode": "",
				"csrfToken": $rootScope.SessionTokenId
			};
			var url = "orchestrator/getData";
			WebService.addData(url, data).then(function(response) {
					for (var i = 0; i < response.length; i++) {
						$scope.redemptionRules.push(response[i].columnList);
					}

			})['catch'](function(reason) {
				$scope.error = reason;
				
			});
		}
			
        $scope.getParameterValues=function(param,idx){
		if(param!='' && param!=undefined ){
			if(param.lookup=='lookup'){ 
				var lookupData=[];
				var paramValue={}
				var url = "orchestrator/getLookupdata/"+param.lookupcode;
		    	WebService.GetData(url).then(function(response) {
		    		for (var i = 0; i < response.length; i++) {
		    			paramValue={
		    				"name":response[i].columnList.responceData
		    			}
						lookupData.push(paramValue);
					}	
					$scope.parameterValues.splice(idx,1,lookupData);	//array.splice(1,0,0)			
		    	});
			}
			$scope.redemptionRules[idx].ldr_parameter_name=param.parametername;
		}	
		
	}
	
	$scope.deleteRedemptionRule=function(idx){
    	var id =$scope.redemptionRules[idx].ldr_id;
    	if(id!=""){
    		jConfirm('Are you sure want to delete this rule?', 'Confirmation Dialog', function(r) {
                if(r){
                	$scope.loading=true;
        			var url='orchestrator/deleteRowId';
        			var data=
        			 {
        				 "keyValue":id,	
        				 "tableName":"loy_redemption_rules",
        				 "columnheader":"ldr_id"
        			 }
        			 
        			WebService.addData(url, data).then(function(response) {				
        				if(response.message.trim()=="success"){
        					jAlert('Redemption rule deleted successfully');	
        					$scope.redemptionRules.splice(idx, 1);
        					$scope.loading=false;
        				}
        				else{
        					$scope.loading=false;
        					jAlert('Failed to delete redemption rule')
        					
        				}
        			})['catch'](function(reason) {
        				$scope.loading=false;
        				jAlert(reason.failure || 'Failed to delete redemption rule');
        			})	
                }
            });
    	}
    	else{
    		$scope.redemptionRules.splice(idx, 1);
    	}
    }
    
    $scope.fileChanged = function($event,idx){
	    var file = $event.target.files[0];
	    var uploadUrl = "orchestrator/fileupload/redemption";
	    var data={};
		 WebService
	     .uploadFileToUrl(file, data, uploadUrl)
	     .then(
	         function(result) {
	        	 	var fileNameArray = result.data.filePath.split('/');
	             		$scope.redemptionRules[idx]["file_name"]=result.data.fileName;
	             		$scope.redemptionRules[idx]["file_location"]=result.data.filePath;
	           
	
	         })['catch']
		   (function(reason) {
		       $scope.loading = false;
		       $scope.error = reason;
		       jAlert("Failed to upload files ");
		   });
	}
	
	$scope.redemptionRulesSubmit=function(){
        var url = "orchestrator/saveDetails"
		angular.forEach($scope.redemptionRules,function(val,key){			
			delete val.parameter;
			delete val.type;
		});
						var data =

						{
							"wsCode": "",
							"action": $scope.currentId?"U":"I",
							"tableName": "loy_redemption_rules",
							"keyColumn": "ldp_id",
							"keyValue": $scope.currentId?$scope.currentId:"",
							"columnValueMap": $scope.redemptionRules,
							"columnDataTypeMap": {
								"ldr_id":"N",
								"ldr_ldp_id":"N",
								"ldr_parameter_name":"S",
								"ldr_parameter_operator":"S",
								"ldr_parameter_value":"S",
								"file_name":"S",
								"file_location":"S"

							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(JSON.stringify(data));
						WebService
							.addData(url, data)
							.then(
								function(response) {

									jAlert("Redemption rules added successfully");
									
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to add redemption rules");
								});
		
		}
	}
	$scope.addRedemptionProducts = function() {
		$scope.showWorkflow = false;
		$scope.isBoxVisible = false;
		$scope.templateUrl = CJApp.templatePath + '/programs/redemptionproducts/addredemptionProducts.html';
		uiAddPopupFactory.open($scope.templateUrl, "addRedemptionProductsController", "add", "sm", 'static', 'Redemption Products', 'list', $scope.programId, "Redemption Products");
	}


	$scope.addAccumulation = function() {

		var templateUrl = CJApp.templatePath + '/programs/accumulation/addAccumulationWorkflow.html';
		uiAddPopupFactory.open(templateUrl, "addAccumulationWorkflowController", "add", "sm", 'static', 'Stream', 'list', $scope.programId, "Add Accumulation");

	}

	$scope.editAccumulation = function(id) {
		var templateUrl = CJApp.templatePath + '/programs/accumulation/addAccumulationWorkflow.html';
		uiAddPopupFactory.open(templateUrl, "addAccumulationWorkflowController", "add", "sm", 'static', 'Stream', 'list', $scope.programId, "Edit Accumulation", { workflowid: id });
	}

	$scope.addTacticWorkflow = function() {

		var templateUrl = CJApp.templatePath + '/programs/tactic/addTacticWorkflow.html';
		uiAddPopupFactory.open(templateUrl, "addTacticWorkflowController", "add", "sm", 'static', 'Stream', 'list', $scope.programId, "Add Tactic");

	}
	
	$scope.editTactic = function(id) {

		var templateUrl = CJApp.templatePath + '/programs/tactic/addTacticWorkflow.html';
		uiAddPopupFactory.open(templateUrl, "addTacticWorkflowController", "add", "sm", 'static', 'Stream', 'list', id, "Edit Tactic", { tacticid: id });
        $rootScope.$emit("loadEditTacticWorkflowData");
	}
	
	$scope.deleteServiceLevel = function(id) {
		jConfirm('Are you sure you want to delete this Service Level?', 'Confirm',
				function(confirmed) {
					if (confirmed) {
						var url = 'orchestrator/deleteRowId';
						var data =
						{
							"keyValue": id,
							"tableName": "loy_service_level",
							"columnheader": "slv_id"
						}
						WebService.addData(url, data).then(function(response) {
							if (!response.success && response.success == undefined) {
								jAlert('Service level deleted successfully');	
								loadServiceLevelList();
								/*initServiceLevelController();*/
							}
						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert(reason.failure
								|| "Something went wrong on delete data");
						});
					}
				});
	}
	/*delete redemption process */
	$scope.deleteRedemptionProcess = function(id) {
		jConfirm('Are you sure you want to delete this Redemption Process?', 'Confirm',
				function(confirmed) {
					if (confirmed) {
						var url = 'orchestrator/deleteRowId';
						var data =
						{
							"keyValue": id,
							"tableName": "loy_redemption_process",
							"columnheader": "ldp_id"
						}
						WebService.addData(url, data).then(function(response) {
							if (!response.success && response.success == undefined) {
							jAlert('Redemption process deleted successfully');	
							    loadRedemptionProcessList();		
								/*initRedemptionProcessController();*/
							}
						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert(reason.failure
								|| "Something went wrong on delete data");
						});
					}
				});
	}
	
	/*delete redemption process */
	

	/*delete redemption partner */
	$scope.deleteProgramPartner = function(id) {
		jConfirm('Are you sure you want to delete this Delete Program Partner?', 'Confirm',
				function(confirmed) {
					if (confirmed) {
						var url = 'orchestrator/deleteRowId';
						var data =
						{
							"keyValue": id,
							"tableName": "loy_partner_organizations",
							"columnheader": "org_id"
						}
						WebService.addData(url, data).then(function(response) {
							if (!response.success && response.success == undefined) {
								jAlert('Partner deleted successfully');	
								loadProgramPartners(id);			
								/*initServiceLevelController();*/
							}
						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert(reason.failure
								|| "Something went wrong on delete data");
						});
					}
				});
	}

	$scope.deleteWorkflowItem= function(id,type) {
		jConfirm('Are you sure you want to delete this item?', 'Confirm',
				function(confirmed) {
					if (confirmed) {
						var collectionname;
						if(type=='Accumulation'){
							collectionname='programconnecteddata'
						}
						else  if(type=='Tactic'){
							collectionname='loyeventconnecteddata'
						}
						else if(type=='Referral'){
							collectionname='referralconnecteddata'
						}
						if(collectionname!=undefined){
							var url=$scope.executionUrl+'deleteworkflow/'+id+'/'+collectionname;							
							WebService.GetData(url).then(function(response) {				
								if(response.message=="Workflow Deleted Successfully"){
									jAlert(response.message);
									if(type=='Accumulation'){
										if($scope.accumulationProcessList.length==1){
											 $scope.showProgramDetails();
											 loadAccumulationList("delete");
										}
										else{
											loadAccumulationList("delete");
										}
										
									}
									else  if(type=='Tactic'){
										if($scope.eventWorkflowsList.length==1){
											 $scope.showProgramDetails();
											 loadEventWorkflowsList("delete");
										}
										else{
											loadEventWorkflowsList("delete");
										}
									}
									else if(type=='Referral'){
										if($scope.referalWorkflowsList.length==1){
											 $scope.showProgramDetails();
											 loadReferalWorkflowsList("delete");
										}
										else{
											loadReferalWorkflowsList("delete");
										}
									}									
									//$rootScope.$emit("loadProgramList");
								}else{
								 jAlert(response.message);
								}
							})['catch'](function(reason) {
						        $scope.error =reason;
						        jAlert(reason.failure || "Failed to delete item");
						    });
						}
						else{
							jAlert("Mongo collection is not available");
						}
						
					}
				});
	}
	
	

	$scope.addInteractiveWorkflow = function() {

		var templateUrl = CJApp.templatePath + '/programs/interactive/addInteractiveWorkflow.html';
		uiAddPopupFactory.open(templateUrl, "addInteractiveWorkflowController", "add", "sm", 'static', 'Stream', 'list', $scope.programId, "Add Interactive");

	}

	$scope.addReferralWorkflow = function() {

		var templateUrl = CJApp.templatePath + '/programs/referral/addReferralWorkflow.html';
		uiAddPopupFactory.open(templateUrl, "addReferralWorkflowController", "add", "sm", 'static', 'Stream', 'list', $scope.programId, "Add Referral");

	}

	$scope.showBoxes = false;


	function loadProcessBoxes(type) {
		$rootScope.initializationData=[];
		var url = "";
		if (type == 'accumulation') {
			url = "workflow/get/programinitializationdatabean/programinitializationdatabean/programinitializationdatabean"
		}
		else if (type == 'event') {
			url = "workflow/get/loyeventinitializationdatabean/loyeventinitializationdatabean/loyeventinitializationdatabean"
		}
		else if (type == 'interactive') {
			url = "workflow/get/programinitializationdatabean/programinitializationdatabean/programinitializationdatabean"
		}
		else if (type == 'referral') {
			url = "workflow/get/referalinitializationdatabean/referalinitializationdatabean/referalinitializationdatabean"
		}
		WebService
			.GetData(url)
			.then(function(res) {
				$rootScope.initializationData = res;

			})['catch'](function(reason) {
				// This is set in the event of an error.
				$scope.error = reason;
				jAlert(reason.failure);
			});
	}

    function loadTacticDetail(wId){
		var data = {
					"wsCode":"",
					"columnList":["*"],
					"keyColumn":"",
					"tableNameList":["wfl_diagrams_eng"],
					"filtersList":["wfd_id="+wId],
					"joinsList":[],
					"moduleCode":"",
					"objectCode":"",
					"csrfToken":$rootScope.SessionTokenId
					};			
		var url="orchestrator/getData";
		WebService.addData(	url, data)
		 .then(function(response) {
					$scope.tacticDetail=response[0].columnList;
					console.log(response);
				});
	}
	$rootScope.getConnectedData = function(data, type) {
		/*consider event type as  tactic workflow*/
		// $scope.accumulationId=data;
		$scope.showWorkflow = true;
		$scope.isBoxVisible = true;
		$scope.workflowId = data;
		$scope.workflowType = type;
		//loadProcessBoxes();
		// $scope.setActiveItem(data,'Accumulation')
		$scope.showEnableButton = false;
		$scope.showEditDeleteButton = false;
		loadProcessBoxes(type);
		$scope.showPropertyData = false;
		instance = WorkflowService.InitiateJSplumb();
		var connectedDataUrl = ""
		if (type == 'accumulation') {
			connectedDataUrl = "workflow/get/programconnecteddata/programconnecteddata/" + $scope.workflowId
		}
		else if (type == "event") {
			connectedDataUrl = "workflow/get/loyeventconnecteddata/loyeventconnecteddata/" + $scope.workflowId
			loadTacticDetail($scope.workflowId);
		}
		else if (type == "referral") {
			connectedDataUrl = "workflow/get/referralconnecteddata/referralconnecteddata/" + $scope.workflowId
			loadTacticDetail($scope.workflowId);
		}
		WebService.GetData(connectedDataUrl).then(function(res) {
			if ($rootScope != null) {
				delete $rootScope;
			}
			$('.jtk-endpoint').remove();
			$('.jtk-connector').remove();
			$rootScope.connectedData = res;

			WorkflowService.autoConnect(instance, $rootScope);
			WorkflowService.onConnect(instance, $scope);
			WorkflowService.onDetach(instance);

			//for showing property sheet
			for (var i = 0; i < $rootScope.connectedData.objectTypeArray.length; i++) {
				for (var j = 0; j < $rootScope.connectedData.objectTypeArray[i].objectArray.length; j++) {
					if ($rootScope.connectedData.objectTypeArray[i].idExternal == $rootScope.initializationData.objectTypeArray[i].idExternal)
						if ($rootScope.initializationData.objectTypeArray[i].type == "R" && type == 'accumulation') {
							$scope.openPropertySheet($rootScope.connectedData.objectTypeArray[i].objectArray[j].name, $rootScope.connectedData.objectTypeArray[i].objectArray[j].currentObjectDomId)
						}
						else if ($rootScope.initializationData.objectTypeArray[i].type == "S" && type == 'event') {
							$scope.openPropertySheet($rootScope.connectedData.objectTypeArray[i].objectArray[j].name, $rootScope.connectedData.objectTypeArray[i].objectArray[j].currentObjectDomId)
						} else if ($rootScope.initializationData.objectTypeArray[i].type == "S" && type == 'referal') {
							$scope.openPropertySheet($rootScope.connectedData.objectTypeArray[i].objectArray[j].name, $rootScope.connectedData.objectTypeArray[i].objectArray[j].currentObjectDomId)
						}
				}
			}
			//$locatio.path
		})['catch'](function(reason) {
			// This is set in the event of an error.
			$scope.error = reason;
			console.log(reason, "failed")
			/*jAlert(reason.error);*/
		});


	}



	$scope.setActiveName = function(name) {
		// alert(name);
	}
	$scope.editAppication = function(workflowId) {

		var title;

		if ($rootScope.diagramInstanceId == 160) {
			title = "Add Bucket"
		}
		else if ($rootScope.diagramInstanceId == 170) {
			title = "Add Trigger/Events"
		} else if ($rootScope.diagramInstanceId == 200) {
			title = "Add Trigger/Events"
		}
		var templateUrl = CJApp.templatePath + '/ComplexEventProcessing/addComplexEventWorkflow.html';
		uiAddPopupFactory.open(templateUrl, "editComplexEventWorkflowController", "add", "sm", 'static', 'Stream', 'list', 0, title, $rootScope.diagramInstanceId);


	}

	$scope.deleteWorkflow = function(workflowId) {
		var url;

		if ($rootScope.diagramInstanceId == 160) {

			url = streamcepUrl + "/cep/deleteBucket/" + workflowId;
		} else if ($rootScope.diagramInstanceId == 170) {
			url = streamcepUrl + "/cep/deleteTrigger/" + workflowId;
		}

		WebService.GetData(url)
			.then(function(response) {

				if (response.respMessage === "success") {
					jAlert("Deleted successfully");
					window.location.reload(true);
				}
			});
	}

	WorkflowService.contextMenus({
		context: $rootScope,

		deleteObject: "deleteModel"
	});


	$scope.showPropertyData = false;

	$scope.openPropertySheet = function(box, boxId) {
		setTimeout(function() { $('.dbox').removeClass('activebox'); $('#' + boxId).addClass('activebox'); }, 100);
		var splitClickedPropertyDomId = boxId.split("_");
		var clickedObjectTypeId = parseInt(splitClickedPropertyDomId[1]);
		var clickedObjectId = parseInt(splitClickedPropertyDomId[2]);
		var boxInfo = null;
		var isConnected = WorkflowService.isConnected(clickedObjectTypeId,
			clickedObjectId);
		var isConnectionLive = WorkflowService.isConnectionLive(
			clickedObjectTypeId, clickedObjectId);
		switch (box) {

			case 'scheduler':
				$scope.showPropertyData = true;
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/accumulation/scheduler/addScheduler.html';
				if ($scope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId === null
					|| $scope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId === "") {
					boxInfo = {
						'workflowId': $rootScope.workflowId,
						'selectionId': clickedObjectTypeId,
						'newObjectId': clickedObjectId
					}

					$scope.selectionId = clickedObjectTypeId;
					$scope.clickedObjectId = clickedObjectId;


					$scope.moduleName = "Scheduler";
					$scope.edit = false;
					$scope.formData = {};
					//$scope.workflowId=$scope.accumulationId;

					$scope.startdatevisibility = false;
					$scope.enddatevisibility = false;
					$scope.minDate = new Date().toDateString();
					$scope.startdate = $filter('date')(new Date(), 'yyyy-MM-dd');
					$scope.enddate = $filter('date')(new Date(), 'yyyy-MM-dd');
					$scope.formData.enddate = $filter('date')(new Date(), 'yyyy-MM-dd');

					var time = new Date();
					var hour = new Date();
					time.setSeconds(0);
					time.setMilliseconds(0);
					hour.setSeconds(0);
					$scope.mrank;
					$scope.mday;
					hour.setMilliseconds(0);

					$scope.dayflag = [];

					$scope.time = {
						value: time
					};
					$scope.hour = {
						value: hour
					};
					$scope.endtime = {
						value: time
					};

					$scope.loadDayNumeric = function(month) {
						$scope.daynumeric = [];
						var currentyear = new Date().getFullYear();
						var daynumeric = daysInMonth(month, currentyear);
						for (i = 1; i <= daynumeric; i++) {
							$scope.daynumeric.push(i);
						}
					}

					function daysInMonth(month, year) {
						return new Date(year, month, 0).getDate();
					}

					/* hide and show calendar */
					$scope.showCalendar = function(type) {
						if (type == 'startdate') {
							if ($scope.startdatevisibility) {
								$scope.startdatevisibility = false;
							} else {
								$scope.startdatevisibility = true;
							}
						} else if (type == 'enddate') {
							if ($scope.enddatevisibility) {
								$scope.enddatevisibility = false;
							} else {
								$scope.enddatevisibility = true;
							}
						} else {
							$scope.startdatevisibility = false;
							$scope.enddatevisibility = false;
						}
					}
					$scope.getSchedulerType = function(stype) {
						var dayflag = typeof ($scope.formData.dayflag)
						if (dayflag == 'string') {
							$scope.dayflag = "";
						}
						if (stype == 'H') {
							$scope.formData.dayflag = $filter('date')($scope.hour, 'HH:mm');
						} else {
							$scope.formData.dayflag = "";
							$scope.formData.recurevery = "";

						}

					}
					$scope.updateDate = function(ndate) {
						$scope.startdate = ndate;
						$scope.formData.startdate = ndate + ' '
							+ $filter('date')($scope.time.value, 'HH:mm:ss');
					}
					$scope.updateEndDate = function(ndate) {
						$scope.formData.enddate = ndate;
						$scope.formData.enddate = ndate + ' '
							+ $filter('date')($scope.endtime.value, 'HH:mm:ss');

					}
					$scope.updateWatcher = function(type) {

					}

					$scope.$watch('time.value', function(newValue, oldValue) {
						$scope.formData.startdate = $scope.startdate + ' '
							+ $filter('date')(newValue, 'HH:mm:ss');
					});

					// for end Data
					$scope.$watch('endtime.value', function(newValue, oldValue) {
						$scope.formData.enddate = $scope.enddate + ' '
							+ $filter('date')(newValue, 'HH:mm:ss');
					});

					$scope.$watch('dayflag', function(newValue, oldValue) {
						if (newValue != oldValue) {
							$scope.formData.dayflag = newValue.toString();
						}
					}, true);

					$scope.$watch('yday', function(newValue, oldValue) {
						if (newValue != oldValue) {
							$scope.formData.dayflag = $scope.ymonth + ' ' + newValue;
						}
					}, true);
					$scope.updateDayFlag = function(type, day, month, rank) {
						if (day == undefined) {
							day = ''
						}
						if (month == undefined) {
							month = ''
						}
						if (rank == undefined) {
							rank = ''
						}
						if (type == 'Ytype1') {
							$scope.formData.dayflag = month + ' ' + day;
						} else if (type == 'Ytype2') {
							$scope.formData.dayflag = rank + ' ' + day + ' ' + month;
						}
					}

					$scope.weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY',
						'SATURDAY', 'SUNDAY'];
					$scope.days = [{
						'MON': 'MONDAY'
					}, {
						'TUE': 'TUESDAY'
					}, {
						'WED': 'WEDNESDAY'
					}, {
						'THU': 'THURSDAY'
					}, {
						'FRI': 'FRIDAY'
					}, {
						'SAT': 'SATURDAY'
					}, {
						'SUN': 'SUNDAY'
					}];
					$scope.months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
						'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

					// $scope.days=['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']


					$scope.validateDay = function(day, sel) {
						if (sel === 'N') {
							delete $scope.formData.dayflag[day];
						}
					}
					$scope.updateDay = function(rank, day) {
						if (rank == undefined || rank == '') {
							rank = '';
						} else if (day == undefined || day == '') {
							day = ''
						}
						$scope.formData.dayflag = rank + ' ' + day;
					}

					$scope.submit = function() {
						var dayflag = typeof ($scope.formData.dayflag);
						if (dayflag == 'object') {
							$scope.formData.dayflag = $filter('date')($scope.formData.dayflag,
								'HH:mm');
							;
						}
						if ($scope.formData.endtype == "NED") {
							$scope.formData.enddate = "";
						}
						if ($scope.formData.endtype == "EAO") {
							$scope.formData.enddate = "";
						}
						if ($scope.formData.endtype == "EBD") {
							var endDatePart = $scope.formData.enddate.split(" ")[0];
							if (endDatePart <= $scope.startdate) {
								alert("End date should be a future date");
								return 0;
							}
						}
						if ($scope.formData.recurtype == 'M'
							|| $scope.formData.recurtype == 'Y') {
							if ($scope.formData.dayflag != null
								&& $scope.formData.dayflag.length > 3) {
								var day = $scope.formData.dayflag;
								var splitday = [];
								splitday = day.split(" ")
								var dayPart = splitday[1].substring(0, 3);
								if ($scope.formData.recurtype == 'M') {
									$scope.formData.dayflag = dayPart + "#" + splitday[0];
								} else {
									$scope.formData.dayflag = splitday[2] + " " + dayPart + "#"
										+ splitday[0];
								}
							}

							// alert($scope.formData.dayflag);
						}

						/*if the recurrence flag is no we need to blank the default values.*/

						if ($scope.formData.recurtypecheck == 'N' || $scope.formData.recurtypecheck == undefined) {
							$scope.formData.recurtype = "N";
							$scope.formData.dayflag = "";
							if ($scope.formData.endtype == "NED") {
								$scope.formData.endtype = "";

							}
						}
						delete ($scope.formData.recurtypecheck);
						var url = "orchestrator/saveDetails"
						var data = {
							"wsCode": "",
							"action": "I",
							"tableName": "scheduler_workflow",
							"keyColumn": "schedulerid",
							"keyValue": "",
							"columnValueMap": [$scope.formData],
							"columnDataTypeMap": {
								"schedulerid": "N",
								"schedulername": "S",
								"schedulerdescription": "S",
								"workflowid": "N",
								"startdate": "T",
								"recurtype": "S",
								"dayflag": "S",
								"recurevery": "N",
								"recurdate": "D",
								"recurday": "S",
								"endtype": "S",
								"enddate": "T",
								"frequency": "N",
								"laststartdate": "T",
								"lastenddate": "T",
								"lastrunduration": "N",
								"nextrundate": "T",
								"status": "S",
								"createuser": "S",
								"createdate": "D",
								"updateuser": "S",
								"updatedate": "D",
								"comments": "S",
								"action": "S",
								"deltaflag": "S",

							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(data);
						WebService
							.addData(url, data)
							.then(
								function(response) {
									var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
									var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
									var shortName = $scope.formData.schedulername;
									var longName = $scope.formData.schedulerdescription;
									WorkflowService.updateConnectedDataWithProperties(
										$rootScope, diagramType,
										$scope.selectionId, $scope.clickedObjectId,
										externalId + '_' + response.keyValue,
										$scope.accumulationId, $rootScope.sourceId,
										shortName, longName);
									jAlert("Scheduler added successfully");
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to add scheduler");
								});
					}

				} else {

					$scope.templateUrl = CJApp.templatePath
						+ '/programs/accumulation/scheduler/addScheduler.html';

					domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;
					$scope.selectionId = clickedObjectTypeId;
					$scope.clickedObjectId = clickedObjectId;
					var selectionIdWithIdExternal = domainId;
					var splitSelectionIdWithIdExternal = selectionIdWithIdExternal.split("_");
					$scope.currentId = splitSelectionIdWithIdExternal[1];
					$scope.formData = {}
					$scope.visibility = false;
					$scope.minDate = new Date().toDateString();
					$scope.dayflag = [];
					$scope.yday;
					loadEditSchdulerData();
					var hour = new Date();
					$scope.cancel = function() {
						jConfirm('Are you sure you want to close the popup?', 'Confirm',
							function(confirmed) {
								if (confirmed) {
									$uibModalInstance.dismiss('cancel');
								}
							});
					};

					/* hide and show calendar */
					$scope.showCalendar = function(type) {
						if (type == 'startdate') {
							if ($scope.startdatevisibility) {
								$scope.startdatevisibility = false;
							} else {
								$scope.startdatevisibility = true;
							}
						} else if (type == 'enddate') {
							if ($scope.enddatevisibility) {
								$scope.enddatevisibility = false;
							} else {
								$scope.enddatevisibility = true;
							}
						} else {
							$scope.startdatevisibility = false;
							$scope.enddatevisibility = false;
						}
					}

					$scope.resetForm = function() {
						$scope.formData = angular.copy($scope.copyEditData);
					};

					$scope.updateDate = function(ndate) {
						$scope.startdate = ndate;
						$scope.formData.startdate = ndate + ' '
							+ $filter('date')($scope.time.value, 'HH:mm:ss');
					}

					$scope.updateEndDate = function(ndate) {
						$scope.formData.enddate = ndate;
						$scope.formData.enddate = ndate + ' '
							+ $filter('date')($scope.endtime.value, 'HH:mm:ss');

					}
					$scope.$watch('time.value', function(newValue, oldValue) {
						$scope.formData.startdate = $scope.startdate + ' '
							+ $filter('date')(newValue, 'HH:mm:ss');
					});

					// for end Data
					$scope.$watch('endtime.value', function(newValue, oldValue) {
						$scope.formData.enddate = $scope.enddate + ' '
							+ $filter('date')(newValue, 'HH:mm:ss');
					});

					$scope.$watch('dayflag', function(newValue, oldValue) {
						if (newValue != oldValue) {
							$scope.formData.dayflag = newValue.toString();
						}
					}, true)

					$scope.$watch('formData.recurtype', function(newValue, oldValue) {

					}, true)

					$scope.updateDay = function(rank, day) {
						if (rank == undefined || rank == '') {
							rank = '';
						} else if (day == undefined || day == '') {
							day = ''
						}
						$scope.formData.dayflag = rank + ' ' + day;
					}

					$scope.updateWatcher = function(type) {
						if ($scope.editmonthlyType == type) {
							$scope.formData.dayflag = $scope.copyEditData.dayflag;
							$scope.formData.recurevery = $scope.copyEditData.recurevery;
						} else {
							$scope.formData.dayflag = '';
							$scope.formData.recurevery = ''
						}
					}
					$scope.updateYearWatcher = function(type) {
						if ($scope.edityearlyType == type) {
							$scope.formData.dayflag = $scope.copyEditData.dayflag;
							var yearlytype = $scope.copyEditData.dayflag.split(' ');
							if (yearlytype.length == 2) {
								$scope.ymonth = yearlytype[0];
								$scope.yday = yearlytype[1];
							} else if (yearlytype.length == 3) {
								$scope.yrank = yearlytype[0];
								$scope.yday = yearlytype[1]
								$scope.ymonth = yearlytype[2];
							}
						} else {
							$scope.formData.dayflag = "";
							$scope.yday = undefined;
							$scope.ymonth = undefined;
						}
					}

					$scope.updateDayFlag = function(type, day, month, rank) {
						if (type == 'Ytype1') {
							$scope.formData.dayflag = month + ' ' + day;
						} else if (type == 'Ytype2') {
							$scope.formData.dayflag = rank + ' ' + day + ' ' + month;
						}
					}

					$scope.weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY',
						'SATURDAY', 'SUNDAY'];
					$scope.days = [{
						'MON': 'MONDAY',
						'TUE': 'TUESDAY',
						'WED': 'WEDNESDAY',
						'THU': 'THURSDAY',
						'FRI': 'FRIDAY',
						'SAT': 'SATURDAY',
						'SUN': 'SUNDAY'
					}];

					// $scope.days=['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']

					$scope.months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
						'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

					$scope.validateDay = function(day, sel) {
						if (sel === 'N') {
							delete $scope.formData.days[day];
						}
					}

					/* Load Edit Data */
					function loadEditSchdulerData() {
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["scheduler_workflow"],
							"filtersList": ["schedulerid=" + $scope.currentId],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						}
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(
							function(response) {
								if (response[0].columnList.status == 'SCHEDULED') {
									alert("Scheduler Cannot Edit.Stop the Job and Edit")
									$uibModalInstance.dismiss('cancel');
								} else {
									$scope.formData = response[0].columnList;
									$scope.formData.recurtypecheck = "S";
									$scope.startdate = $filter('date')(
										new Date($scope.formData.startdate), 'yyyy-MM-dd');
									if ($scope.formData.endtype == "NED" || $scope.formData.enddate == null) {
										$scope.enddate = $filter('date')(new Date(), 'yyyy-MM-dd');
										$scope.formData.enddate = $filter('date')(new Date(), 'yyyy-MM-dd');

									} else {
										$scope.enddate = $filter('date')(
											new Date($scope.formData.enddate), 'yyyy-MM-dd');
									}
									var time = new Date($scope.formData.startdate);
									var hour = new Date($scope.formData.startdate);
									time.setSeconds(0);
									time.setMilliseconds(0);
									hour.setSeconds(0);
									hour.setMilliseconds(0);
									$scope.time = {
										value: time
									};

									$scope.editRecurType = angular
										.copy($scope.formData.recurtype);
									$scope.copyEditData = angular.copy($scope.formData);
									// for end time
									var endtime = new Date($scope.formData.enddate);
									endtime.setSeconds(0);
									endtime.setMilliseconds(0);
									$scope.endtime = {
										value: endtime
									};
									$scope.hour = {
										value: hour
									};

									if ($scope.formData.recurtype === 'W') {
										$scope.dayflag = $scope.formData.dayflag.split(',');
									} else if ($scope.formData.recurtype === 'H') {
										var editHour = $scope.formData.dayflag.split(':');
										hour.setHours(editHour[0]);
										hour.setMinutes(editHour[1]);

										$scope.hour = {
											value: hour
										};
										$scope.formData.dayflag = hour;
									} else if ($scope.formData.recurtype === 'M') {
										if ($scope.formData.dayflag.indexOf(' ') >= 0) {
											$scope.monthlyType = 'MType2';
											$scope.editmonthlyType = angular
												.copy($scope.monthlyType)
											var ranknday = $scope.formData.dayflag.split(' ');
											$scope.mrank = ranknday[0]
											$scope.mday = ranknday[1]
										} else {
											$scope.monthlyType = 'MType1';
										}
									} else if ($scope.formData.recurtype === 'Y') {
										var yearlytype = $scope.formData.dayflag.split(' ');
										if (yearlytype.length == 2) {
											$scope.Ytype = 'Ytype1';
											$scope.yday = yearlytype[1]
											$scope.ymonth = yearlytype[0];
											$scope.loadDayNumeric($scope.ymonth);
										} else if (yearlytype.length == 3) {
											$scope.Ytype = 'Ytype2';
											$scope.yrank = yearlytype[0];
											$scope.yday = yearlytype[1]
											$scope.ymonth = yearlytype[2];
										}
										$scope.edityearlyType = angular.copy($scope.Ytype)
									} else if ($scope.formData.recurtype == 'N') {
										$scope.formData.recurtypecheck = $scope.formData.recurtype;
									}
									else {

									}
								}
							})['catch'](function(reason) {
								$scope.error = reason;
								jAlert(reason.failure || "Something went wrong on getting data");
							});
					}

					$scope.loadDayNumeric = function(month) {
						$scope.daynumeric = [];
						var currentyear = new Date().getFullYear();
						var daynumeric = daysInMonth(month, currentyear);
						for (i = 1; i <= daynumeric; i++) {
							$scope.daynumeric.push(i);
						}
					}

					function daysInMonth(month, year) {
						return new Date(year, month, 0).getDate();
					}

					$scope.getSchedulerType = function(stype) {
						var dayflag = typeof ($scope.formData.dayflag)
						if (dayflag == 'string') {
							// $scope.dayflag=angular.copy($scope.formData.dayflag);
						}

						if (stype == $scope.editRecurType) {
							$scope.formData.dayflag = $scope.copyEditData.dayflag;
							$scope.formData.recurevery = $scope.copyEditData.recurevery;
						} else if (newValue == 'H') {
							$scope.formData['dayflag'] = $filter('date')($scope.hour,
								'HH:mm');
						}
						else {
							$scope.formData['dayflag'] = angular.copy($scope.dayflag);

						}

					}

					$scope.submit = function() {

						if ($scope.formData.recurday != undefined) {
							var recurdaySplit = null;
							recurdaySplit = $scope.formData.recurday.split(",");
							recurdaySplit.sort(function(a, b) {
								return a - b;
							})
							var recurday = recurdaySplit.toString();
							$scope.formData.recurday = recurday;
						}
						var dayflag = typeof ($scope.formData.dayflag);
						if (dayflag == 'object') {
							$scope.formData.dayflag = $filter('date')($scope.formData.dayflag,
								'HH:mm');
							;
						}
						if ($scope.formData.endtype == "NED") {
							delete ($scope.formData.enddate);
						}
						if ($scope.formData.endtype == "EAO") {
							delete ($scope.formData.enddate);
						}
						if ($scope.formData.endtype == "EBD") {
							var endDatePart = $scope.formData.enddate.split(" ")[0];
							if (endDatePart <= $scope.startdate) {
								alert("End date should be a future date");
								return 0;
							}
						}

						if ($scope.formData.recurtype == 'M'
							|| $scope.formData.recurtype == 'Y') {
							if ($scope.formData.dayflag != null
								&& $scope.formData.dayflag.length > 3) {
								var day = $scope.formData.dayflag;
								var splitday = [];
								splitday = day.split(" ")
								var dayPart = splitday[1].substring(0, 3);
								if ($scope.formData.recurtype == 'M') {
									$scope.formData.dayflag = dayPart + "#" + splitday[0];
								} else {
									$scope.formData.dayflag = splitday[2] + " " + dayPart + "#"
										+ splitday[0];
								}
							}

						}

						if ($scope.formData.recurtypecheck == 'N' || $scope.formData.recurtypecheck == undefined || $scope.formData.recurtypecheck) {
							$scope.formData.recurrenceflag = "N";
							if ($scope.formData.endtype == "NED") {
								$scope.formData.endtype = "";
							}
							if ($scope.formData.recurtype == "H") {
								$scope.formData.recurtype = "";
								$scope.formData.dayflag = "";
							}

						}
						$scope.formData.nextrundate = null;
						$scope.formData.lastenddate = null;
						$scope.formData.laststartdate = null;
						$scope.formData.lastrunduration = null;
						$scope.formData.status = 'NEW';
						if ($scope.formData.endtype != 'EBD') {
							$scope.formData.enddate = null;
						} else {
							$scope.formData.frequency = "null";
						}
						if ($scope.formData.recurtypecheck == 'N' || $scope.formData.recurtypecheck == undefined || $scope.formData.recurtypecheck) {
							$scope.formData.recurtype = "N";
							$scope.formData.dayflag = null;
							$scope.formData.enddate = null;
							$scope.formData.frequency = null;
							$scope.formData.recurevery = null;
							$scope.formData.endtype = null;
						}
						delete ($scope.formData.recurtypecheck);
						var url = "orchestrator/saveDetails"
						var data = {
							"wsCode": "",
							"action": "U",
							"tableName": "scheduler_workflow",
							"keyColumn": "schedulerid",
							"keyValue": $scope.currentId,
							"columnValueMap": [$scope.formData],
							"columnDataTypeMap": {
								"schedulerid": "N",
								"schedulername": "S",
								"schedulerdescription": "S",
								"workflowid": "N",
								"startdate": "T",
								"recurtype": "S",
								"dayflag": "S",
								"recurevery": "N",
								"recurdate": "D",
								"recurday": "S",
								"endtype": "S",
								"enddate": "T",
								"frequency": "N",
								"laststartdate": "T",
								"lastenddate": "T",
								"lastrunduration": "N",
								"nextrundate": "T",
								"status": "S",
								"createuser": "S",
								"createdate": "D",
								"updateuser": "S",
								"updatedate": "D",
								"comments": "S",
								"action": "S",
								"deltaflag": "S",

							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(JSON.stringify(data));
						WebService
							.addData(url, data)
							.then(
								function(response) {
									var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
									var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
									var shortName = $scope.formData.schedulername;
									var longName = $scope.formData.schedulerdescription;
									WorkflowService.updateConnectedDataWithProperties(
										$rootScope, diagramType,
										$scope.selectionId, $scope.clickedObjectId,
										externalId + '_' + response.keyValue,
										$scope.workflowId, $rootScope.sourceId,
										shortName, longName);
									jAlert("Scheduler edited successfully");
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to edit scheduler");
								});
					}
				}

				break;

			case 'reward':
				$scope.showPropertyData = false;
				$scope.rewardFormData = {};
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/accumulation/rewards/addReward.html';
				$scope.isWorkflowWindow = true;
				if ($scope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId === null
					|| $scope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId === "") {

					$scope.selectionId = clickedObjectTypeId;
					$scope.clickedObjectId = clickedObjectId;
					$scope.showPropertyData = true;
					$scope.showExistingReward = true;
					$scope.rewardFormData = {
						"lrw_id": "",
						"lrw_act_code": "",
						"lrw_status": "A",
						"createdate": "",
						"createuser": "",
						"updatedate": "",
						"updateuser": "",
						"lastmodified": "",
						"lrw_sub_unit": "",
						"lrw_earn_accumulation_unit": "",
						"lrw_applied_value": ""
					}
					loadBaslookuDetails();
					loadActionType();
					//loadExistingRewards();

					function loadActionType() {
						$scope.actionTypeList = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_action_type"],
							"filtersList": [],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							$scope.actionTypeList = [];
							for (var i = 0; i < response.length; i++) {
								$scope.actionTypeList.push(response[i].columnList);
							}

						});
					}


					$scope.getActionTypeAttributes = function(actionType) {
						$scope.actionTypeAttriList = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_action_type_attribute"],
							"filtersList": ["ata_act_code=" + actionType],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.actionTypeAttriList.push(response[i].columnList);
							}

						});
					}


					function loadBaslookuDetails() {
						$scope.baslookuDetailsList = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["bas_lookup_details"],
							"filtersList": [],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.baslookuDetailsList.push(response[i].columnList);
							}

						});
					}

					/* Load All Folder */
					$scope.loadFolder = function(exr) {
						$scope.folderList = [];
						if (exr) {
							var data = {
								"wsCode": "",
								"columnList": ["*"],
								"keyColumn": "",
								"tableNameList": ["orc_folder"],
								"filtersList": [],
								"joinsList": [],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							};
							var url = "orchestrator/getData";
							WebService.addData(url, data)
								.then(function(response) {
									for (var i = 0; i < response.length; i++) {
										$scope.folderList.push(response[i].columnList);
									}

									//$scope.Folders = $filter('orderBy')(folderList, "fld_create_date");
								})
							['catch'](function(reason) {
								// This is set in the event of an error.
								$scope.error = reason;
								jAlert(reason.failure);
							});
						}

					}
					$scope.loadRewards = function() {
						$scope.existingRewardsList = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_rewards"],
							"filtersList": [],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							//$scope.formData.push(response[0].columnList);
							for (var i = 0; i < response.length; i++) {
								$scope.existingRewardsList.push(response[i].columnList);
							}
						});
					}
					$scope.fetchRewardDetailFromId = function(rid) {
						if (rid != '') {
							var data = {
								"wsCode": "",
								"columnList": ["*"],
								"keyColumn": "",
								"tableNameList": ["loy_rewards"],
								"filtersList": ["lrw_id=" + rid],
								"joinsList": [],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							};
							var url = "orchestrator/getData";
							WebService.addData(url, data).then(function(response) {
								$scope.rewardFormData = response[0].columnList;
								$scope.rewardFormData.lrw_id = ""

							});
						}
					}
					$scope.loadExistingRewards = function(exr) {
						if (exr) {
							$scope.existingRewards = [];
							var data = {
								"wsCode": "",
								"columnList": ["*"],
								"keyColumn": "",
								"tableNameList": ["loy_rewards"],
								"filtersList": [],
								"joinsList": [],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							};
							var url = "orchestrator/getData";
							WebService.addData(url, data).then(function(response) {
								for (var i = 0; i < response.length; i++) {
									$scope.existingRewards.push(response[i].columnList);
								}

							});
						}
					}

					$scope.rewardFormData.lrw_id = '';
					$scope.rewardFormData.lrw_fld_id = $rootScope.fld_id;
					$scope.pointCalculation = function() {
						var templateUrl = CJApp.templatePath + '/reward/pointCalculation.html';
						uiPopupFactory.open(templateUrl, "calculatePointPercentageController", "add", "sm", 'static', '', 'list', "Calculator", "Calculator");
					}
					$rootScope.$on('updateCalculatedPercentage', function(event, cdata) { // You forgot to pass the 'event' parameter before the rest of parameters
						$scope.rewardFormData.lrw_value = cdata.lrw_value;
						$scope.rewardFormData.lrw_earn_accumulation_unit = cdata.accumulationUnit;
						$scope.rewardFormData.lrw_applied_value = cdata.appliedValue;
					});
					$scope.submit = function() {
						var url = "orchestrator/saveDetails"
						var data = {
							"wsCode": "",
							"action": "I",
							"tableName": "loy_rewards",
							"keyColumn": "lrw_id",
							"keyValue": "",
							"columnValueMap": [$scope.rewardFormData],
							"columnDataTypeMap": {
								"lrw_id": "N",
								"lrw_short_name": "S",
								"lrw_long_name": "S",
								"lrw_act_code": "S",
								"lrw_calculation_type": "S",
								"lrw_roundoff_type": "S",
								"lrw_pending_period": "N",
								"lrw_limiting_attribute": "S",
								"lrw_threshold_value": "N",
								"lrw_percent_attribute": "S",
								"lrw_cap_value": "N",
								"lrw_value": "N",
								"lrw_unit": "S",
								"lrw_rtl_id": "N",
								"lrw_status": "S",
								"lrw_fld_id": "N",
								"createuser": "S",
								"createdate": "D",
								"updateuser": "S",
								"updatedate": "D",
								"lastmodified": "T",
								//"lrw_accumulation_id":"S",
								"lrw_rewards_unit": "S",
								"lrw_rewards_actiontype": "S",
								"lrw_sub_unit": "S",
								"lrw_earn_accumulation_unit": "S",
								"lrw_applied_value": "N",
								"lrw_percentage_value": "S",
								"parent_reward_unit": "S"
							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(data);
						WebService
							.addData(url, data)
							.then(
								function(response) {
									//$uibModalInstance.close();
									var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
									var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
									var shortName = $scope.rewardFormData.lrw_short_name;
									var longName = $scope.rewardFormData.lrw_long_name;
									WorkflowService.updateConnectedDataWithProperties(
										$rootScope, diagramType,
										clickedObjectTypeId, $scope.clickedObjectId,
										externalId + '_' + response.keyValue,
										$scope.accumulationId, $rootScope.sourceId,
										shortName, longName);
									jAlert("Rewards added successfully good");
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to add rewards");
								});
					}

					$scope.calculatePercentage = function(accumulationUnit, appliedValue) {
						if (accumulationUnit !== '' && appliedValue !== '') {
							var percentageValue = (accumulationUnit / appliedValue) * 100;
							$scope.rewardFormData.lrw_value = percentageValue;
						}

					}

					/*function calculatePercentage() {
						if ($("#earn-accumulation-unit").val() !== ''
								&& $("#applied-to").val() !== '') {
							var percentageValue = ($("#earn-accumulation-unit").val() / $(
									"#applied-to").val()) * 100;
							$("#equal-to").val(percentageValue);
						}
					}*/
				} else {
					//					$scope.templateUrl = CJApp.templatePath
					//					+ '/programs/addReward.html';
					$scope.showPropertyData = true;
					domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;
					var splitDomId = domainId.split("_");
					$scope.lrwid = parseInt(splitDomId[1]);
					$scope.selectionId = clickedObjectTypeId;
					$scope.clickedObjectId = clickedObjectId;
					$scope.showExistingReward = false;
					//$scope.formData={};
					loadRewards();
					loadBaslookuDetails();
					loadActionType();
					//	$scope.edit=true;
					$scope.calculatePercentage = function(accumulationUnit, appliedValue) {
						if (accumulationUnit !== '' && appliedValue !== '') {
							var percentageValue = (accumulationUnit / appliedValue) * 100;
							$scope.rewardFormData.lrw_value = percentageValue;
						}

					}


					function loadRewards() {
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_rewards"],
							"filtersList": ["lrw_id=" + $scope.lrwid],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							//$scope.formData.push(response[0].columnList);
							$scope.rewardFormData = response[0].columnList;
						});
					}
					function loadActionType() {
						$scope.actionTypeList = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_action_type"],
							"filtersList": [],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.actionTypeList.push(response[i].columnList);
							}

						});
					}


					$scope.getActionTypeAttributes = function(actionType) {
						$scope.actionTypeAttriList = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "ata_id",
							"tableNameList": ["loy_action_type_attribute"],
							"filtersList": ["ata_act_code=" + actionType],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.actionTypeAttriList.push(response[i].columnList);
							}

						});
					}

					function loadBaslookuDetails() {
						$scope.baslookuDetailsList = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["bas_lookup_details"],
							"filtersList": [],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.baslookuDetailsList.push(response[i].columnList);
							}

						});
					}



					$scope.pointCalculation = function() {
						var templateUrl = CJApp.templatePath + '/reward/pointCalculation.html';
						uiPopupFactory.open(templateUrl, "calculatePointPercentageController", "add", "sm", 'static', '', 'list', "Calculator", "Calculator");
					}
					$rootScope.$on('updateCalculatedPercentage', function(event, cdata) { // You forgot to pass the 'event' parameter before the rest of parameters
						$scope.rewardFormData.lrw_value = cdata.lrw_value;
						$scope.rewardFormData.lrw_earn_accumulation_unit = cdata.accumulationUnit;
						$scope.rewardFormData.lrw_applied_value = cdata.appliedValue;
					});
					$scope.rewardFormData.lrw_fld_id = $rootScope.fld_id;
					$scope.submit = function() {
						var url = "orchestrator/saveDetails"
						var data = {
							"wsCode": "",
							"action": "U",
							"tableName": "loy_rewards",
							"keyColumn": "lrw_id",
							"keyValue": $scope.lrwid,
							"columnValueMap": [$scope.rewardFormData],
							"columnDataTypeMap": {
								"lrw_id": "N",
								"lrw_short_name": "S",
								"lrw_long_name": "S",
								"lrw_act_code": "S",
								"lrw_calculation_type": "S",
								"lrw_roundoff_type": "S",
								"lrw_pending_period": "N",
								"lrw_limiting_attribute": "S",
								"lrw_threshold_value": "N",
								"lrw_percent_attribute": "S",
								"lrw_cap_value": "N",
								"lrw_value": "N",
								"lrw_unit": "S",
								"lrw_rtl_id": "N",
								"lrw_status": "S",
								"lrw_fld_id": "N",
								"createuser": "S",
								"createdate": "D",
								"updateuser": "S",
								"updatedate": "D",
								"lastmodified": "T",
								"lrw_accumulation_id": "S",
								"lrw_rewards_unit": "S",
								"lrw_rewards_actiontype": "S",
								"lrw_earn_accumulation_unit": "N",
								"lrw_applied_value": "N"

							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(data);
						WebService
							.addData(url, data)
							.then(
								function(response) {
									//$uibModalInstance.close();
									var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
									var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
									var shortName = $scope.rewardFormData.lrw_short_name;
									var longName = $scope.rewardFormData.lrw_long_name;
									WorkflowService.updateConnectedDataWithProperties(
										$rootScope, diagramType,
										$scope.selectionId, $scope.clickedObjectId,
										externalId + '_' + response.keyValue,
										$scope.accumulationId, $rootScope.sourceId,
										shortName, longName);
									jAlert("Rewards updated successfully");
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to edit rewards");
								});
					}


				}
				break;
			case 'rewardstrategy':
				$scope.isWorkflowWindow = true;
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/accumulation/rewardstrategy/addRewardStrategy.html';
				$scope.showExistingRewardStrategy = true;
				$rootScope.rewardstabs = {
					"activeTab": 0
				}
				$scope.currentId = null;
				$scope.isValidActionTypeFlag = false;
				$scope.selectedActionTypes = [];
				$scope.qualificationFormData = {};
				$scope.selectionData = [];
				/* hide and show calendar */
             	$scope.formData = {};
				$scope.minDate = new Date().toDateString();
				$scope.maxDate = new Date().toDateString();
				$scope.rewardsStatus = {
					isOpen: [true]
				};
				loadMemberActions();
				loadPartnerLevelList();
				loadRepeatActions();
				$scope.updateDate = function(ndate) {
					var d = new Date(ndate);
					d.setDate(d.getDate() + 1);
					var maxdate = d.toLocaleDateString();
					var dd = d.getDate();
					if (dd < 10) {
						dd = '0' + dd;
					}
					var mm = d.getMonth() + 1;
					if (mm < 10) {
						mm = '0' + mm;
					}
					var yyyy = d.getFullYear();
					maxdate = yyyy + '-' + mm + '-' + dd;
					$scope.maxDate = maxdate;

				}

				/*load rewards for associate*/
				$scope.loadRewards = function() {
					//if($scope.formData.clr_act_code !=undefined && $scope.formData.clr_act_code!=null){
					$scope.rewardList = [];
					var operatordata = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "lrw_id",
						"tableNameList": ["loy_rewards"],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					}

					var url = "orchestrator/getData";
					WebService.addData(url, operatordata).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.rewardList.push(response[i].columnList);
						}

					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure
							|| "Something went wrong on loading rewards");
					});
					//	}

				}
				/*functon for member action*/
				function loadMemberActions() {
					$scope.memberActionList = [];
					var operatordata = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "act_code",
						"tableNameList": ["loy_action_type"],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					}

					var url = "orchestrator/getData";
					WebService.addData(url, operatordata).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.memberActionList.push(response[i].columnList);
						}

					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure
							|| "Something went wrong on loading member action list");
					});


				}
				
				function  loadRepeatActions(){
				$scope.actionAttributes=[];
				var operatordata = {
						"wsCode" : "",
						"columnList" : [ "*" ],
						"keyColumn" : "ata_id",
						"tableNameList" : [ "loy_action_type_attribute" ],
						"filtersList" : [],
						"joinsList" : [],
						"moduleCode" : "",
						"objectCode" : "",
						"csrfToken" : $rootScope.SessionTokenId
					}
		
					var url = "orchestrator/getData";
					WebService.addData(url, operatordata).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.actionAttributes.push(response[i].columnList);
						}
		
					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure
								|| "Something went wrong on loading member action list");
					});
				
				
			}

				/*function for partner level*/
				function loadPartnerLevelList() {
					$scope.partnerLevelList = [];
					var operatordata = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "org_id",
						"tableNameList": ["loy_partner_organizations"],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					}

					var url = "orchestrator/getData";
					WebService.addData(url, operatordata).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.partnerLevelList.push(response[i].columnList);
						}

					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure
							|| "Something went wrong on loading member action list");
					});
				}

				/*function for qualification criteria*/
				$scope.loadMemberActionAttributes = function(type) {
					$scope.memberAttributesList = [];
					$scope.actionTypeAttributesList = [];
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "",
						"tableNameList": ["loy_action_type_attribute"],
						"filtersList": ["ATA_ACT_CODE=" + type],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								if (type == 'MEMBER') {
									$scope.memberAttributesList.push(response[i].columnList);
								}
								else {
									$scope.actionTypeAttributesList.push(response[i].columnList);
								}

							}
						});
				}

				/*Set active column*/
				$scope.setActiveColumn = function(col,header) {
				$scope.selectedRow = col.ata_attribute_name;
				$scope.headerName= header
			   }
				function typeInTextarea(el, newText) {
					var start = el.selectionStart
					var end = el.selectionEnd
					var text = el.value
					var before = text.substring(0, start)
					var after = text.substring(end, text.length)
					el.value = (before + newText + after)
					el.selectionStart = el.selectionEnd = start + newText.length
					el.focus();
					$scope.formData.qcr_value2 = el.value;
				}
				if ($scope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId === null
					|| $scope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId === "") {
					boxInfo = {
						'workflowId': $rootScope.workflowId,
						'selectionId': clickedObjectTypeId,
						'newObjectId': clickedObjectId
					}

					$scope.formData = {
						'clr_id': '',
						'clr_ptn_org_id': '',
						'clr_prm_code': '',
						'clr_ptn_level': 'N',
						'createuser': '',
						'updateuser': '',
						'createdate': '',
						'updatedate': '',
						'lastmodified': ''
					};
					$scope.commentsFormData = {}
					$scope.qualificationFormData = {};
					$scope.aggregationFormData = {};
					$scope.selectionId = clickedObjectTypeId;
					$scope.clickedObjectId = clickedObjectId;

					$scope.loadAssociateRewards = function() {
						$scope.loadAssociateRewardsList = [];
						var connectedDataModel = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray.length;
						if (connectedDataModel > 0) {
							//var rewardsDomainId=[];
							for (var i = 0; i < connectedDataModel; i++) {
								var objectid = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].objectId
								var objectTypeId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].objectTypeId
								var domainid = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId;
								if (parseInt($rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
									if (domainid !== "" && domainid !== null && domainid !== undefined) {
										var splitDomain = domainid.split('_');
										//rewardsDomainId.push(splitDomain[1]);
										//$scope.isValidActionType(rewardsDomainId);
										var data = {
											"wsCode": "",
											"columnList": ["*"],
											"keyColumn": "lrw_id",
											"tableNameList": ["loy_rewards"],
											"filtersList": ["lrw_id=" + splitDomain[1]],
											"joinsList": [],
											"moduleCode": "",
											"objectCode": "",
											"csrfToken": $rootScope.SessionTokenId
										}

										var url = "orchestrator/getData";
										WebService.addData(url, data).then(function(response) {
											if ($scope.selectedActionTypes.length == 0) {
												if(response[0].columnList.lrw_act_code!=null){
													$scope.selectedActionTypes.push(response[0].columnList.lrw_act_code);
													
												}	
												$scope.isValidActionTypeFlag = true;											
											}
											else {
												angular.forEach($scope.selectedActionTypes, function(val, key) {
													if (val == response[0].columnList.lrw_act_code) {
														$scope.isValidActionTypeFlag = true;
														$scope.selectedActionTypes.push(response[0].columnList.lrw_act_code);
													}
													else {
														$scope.isValidActionTypeFlag = false;
														return;
													}
												})
											}
											//$scope.selectedActionTypes.push(response[0].lrw_act_code);
											if ($scope.isValidActionTypeFlag) {
												console.log($scope.isValidActionTypeFlag);
												$scope.showPropertyData = true;
												$scope.loadAssociateRewardsList.push({
													"lrs_id": "",
													"lrs_clr_id": $scope.currentId,
													"lrs_lrw_id": response[0].columnList.lrw_id,
													"lrs_name": response[0].columnList.lrw_short_name,
													"lrs_description": "",
													"lrs_expiry_flag": "",
													"lrs_validity": "",
													"lrs_validity_unit": "",
													"lrs_expiry_type": "",
													"lrs_expiry_date": ""

												});
												$scope.formData.clr_act_code = $scope.selectedActionTypes[0];
												$scope.loadRewards();
											}
											else {
												var information = "A rewards strategy process box should have same  action types in rewards.Please check and add rewards strategy";
												jAlert(information);
												$scope.showPropertyData = false;
												return false;
											}


										})['catch'](function(reason) {
											$scope.error = reason;
											jAlert(reason.failure
												|| "Something went wrong on loading rewards");
										});

										//	get
										//								        	$rootScope.sourceId.push($rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId); 
										//								            $rootScope.sourceNames.push({'id':$rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId,'sourceName':$rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].shortName});
									}
									else {
										if (parseInt($rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
											var information = "A rewards strategy process box should have atleast one inputs with its properties set.";
											jAlert(information);
											$scope.showPropertyData = false;
											return;
										}
									}
								}
							}
						}
						else {
							var information = "A rewards strategy process box should have atleast one inputs with its properties set.";
							jAlert(information);
							$scope.showPropertyData = false;
							return false;
						}
					}
					$scope.loadAssociateRewards();
					$scope.getText = function(prm_status) {
						$scope.prm_status = false;
						if (prm_status == 'Y') {

							$scope.prm_status = true;
						}
					}


					$scope.loadRewardStrategy = function() {
						$scope.existingRewardStrategyList = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_calculation_rule"],
							"filtersList": [],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							//$scope.formData.push(response[0].columnList);
							for (var i = 0; i < response.length; i++) {
								$scope.existingRewardStrategyList.push(response[i].columnList);
							}
						});
					}
					$scope.fetchRewardStrategyDetailFromId = function(rid) {
						if (rid != '') {
							var data = {
								"wsCode": "",
								"columnList": ["*"],
								"keyColumn": "",
								"tableNameList": ["loy_calculation_rule"],
								"filtersList": ["clr_id=" + rid],
								"joinsList": [],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							};
							var url = "orchestrator/getData";
							WebService.addData(url, data).then(function(response) {
								$scope.formData = response[0].columnList;
							});
						}
					}

					$scope.deleteReward = function(idx) {
						var id = $scope.loadAssociateRewardsList[idx].lrs_id;
						if (id != "") {
							jConfirm('Are you sure want to delete this reward?', 'Confirmation Dialog', function(r) {
								if (r) {
									$scope.loading = true;
									var url = 'orchestrator/deleteRowId';
									var data =
									{
										"keyValue": id,
										"tableName": "loy_reward_strategies",
										"columnheader": "lrs_id"
									}
									WebService.addData(url, data).then(function(response) {
										if (response.message.trim() == "success") {
											jAlert('Reward data deleted successfully');
											$scope.loadAssociateRewardsList.splice(idx, 1);
										}
										else {
											jAlert('Failed to delete reward')

										}
									})['catch'](function(reason) {
										jAlert(reason.failure || 'Failed to delete reward');
									})
								}
							});
						}
						else {
							$scope.loadAssociateRewardsList.splice(idx, 1);
						}
					}



					//						$scope.addAssociateReward=function(){
					//							$scope.loadAssociateRewardsList.push({
					//									"lrs_id":"",	
					//								   "lrs_clr_id":"",	
					//								   "lrs_lrw_id":"",	
					//								   "lrs_name":"",	
					//								   "lrs_description":"",	
					//								   "lrs_expiry_flag":"",	
					//								   "lrs_validity":"",	
					//								   "lrs_validity_unit":"",	
					//								   "lrs_expiry_type":"",	
					//								   "lrs_expiry_date":""
					//							})
					//							
					//							
					//						}

					/*functions  for qualification criteria*/
					/*Add New Row*/
					$scope.addExpression = function(tablename) {
						var sortId = $scope.selectionData.length + 1;
						var selectioncolumn = {
							"qcr_id": "",
							"qcr_ata_act_code": $scope.formData.clr_act_code,
							"qcr_ata_attribute_name": "",
							"qcr_clr_id": $scope.currentId,
							"qcr_criteria_type": $scope.qualificationFormData.qcr_criteria_type,
							"qcr_criteria_no": sortId,
							"qcr_condition_order": sortId,
							"qcr_group_open_parenthesis": "",
							"qcr_group_close_parenthesis": "",
							"qcr_logical_operator": "",
							"qcr_value1": "",
							"qcr_value2":$scope.qualificationFormData.qcr_value2,
							"createuser": "",
							"createdate": "",
							"updateuser": "",
							"updatedate": "",
							"lastmodified": "",

						}
						$scope.selectionData.push(selectioncolumn);

					}

					$scope.getColumns = function(column, index) {
						$scope.selectedRowIndex = index;
						$scope.selectedColumn = column;
					}

			/*Added function for push attributes*/
			$scope.pushQualificationAttributes = function(selectedCol,headername) {
				function typeInTextarea(element, value) {
        			 element.value = value;
				}
				if ($scope.qualificationFormData.qcr_criteria_type == "exp" | $scope.selectedColumn == 'E') {
	
					typeInTextarea(document.getElementById('text'),  headername+"."+selectedCol);
					return;
				} else if ($scope.selectionData.length == 0) {
					jAlert('Please select add before you pushing attribute.');
				}
				for (var i = 0; i < $scope.selectionData.length; i++) {
					if ($scope.selectedRowIndex == i) {
						$scope.selectionData[$scope.selectedRowIndex].qcr_ata_attribute_name = selectedCol;
						$scope.selectionData[$scope.selectedRowIndex].qcr_ata_act_code = $scope.formData.clr_act_code;
	
					}
				}
			}

					/*add function for aggregation criteria*/
					$scope.loadAggregationFunctions = function() {
						$scope.operatorsList = [];
						var operatordata = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "DLD_DLK_LOOKUP_NAME",
							"tableNameList": ["bas_lookup_details"],
							"filtersList": ["DLD_DLK_LOOKUP_NAME='AGGREGATE_FUNCTION'"],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						}

						var url = "orchestrator/getData";
						WebService.addData(url, operatordata).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.operatorsList.push(response[i].columnList);
							}

						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert(reason.failure
								|| "Something went wrong on loading operators");
						});


					}

					$scope.loadActionTypeAttributes = function() {
						$scope.attributeList = [];
						var operatordata = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "ATA_ACT_CODE",
							"tableNameList": ["loy_action_type_attribute"],
							"filtersList": ["ATA_ACT_CODE=" + $scope.formData.clr_act_code],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						}

						var url = "orchestrator/getData";
						WebService.addData(url, operatordata).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.attributeList.push(response[i].columnList);
							}

						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert(reason.failure
								|| "Something went wrong on loading action type attrributes");
						});


					}
					
					$scope.loadActionAttribute = function(actionType){
							$scope.actionAttributes = [];
						    var data = {
						        "wsCode": "",
						        "columnList": ["*"],
						        "keyColumn": "ata_id",
						        "tableNameList": ["loy_action_type_attribute"],
						        "filtersList": ["ata_act_code=" + actionType],
						        "joinsList": [],
						        "moduleCode": "",
						        "objectCode": "",
						        "csrfToken": $rootScope.SessionTokenId
						    };
						
						    var url = "orchestrator/getData";
						    WebService.addData(url, data).then(function (response) {
						        for (var i = 0; i < response.length; i++) {
						            $scope.actionAttributes.push(response[i].columnList); 
						        }
						    }).catch(function (reason) {
						        $scope.error = reason;
						        jAlert(reason.failure || "Something went wrong on loading attributes");
						    });
						}

					$scope.submit = function() {
						var url = "orchestrator/saveDetails"
						var data =
						{
							"wsCode": "",
							"action": "I",
							"tableName": "loy_calculation_rule",
							"keyColumn": "clr_id",
							"keyValue": "",
							"columnValueMap": [$scope.formData],
							"columnDataTypeMap": {
								"clr_id": "N",
								"clr_short_name": "S",
								"clr_long_name": "S",
								"clr_act_code": "S",
								"clr_applied_on": "S",
								"clr_prm_code": "N",
								"clr_ptn_level": "S",
								"clr_ptn_org_id": "N",
								"clr_repeate_action": "S",
								"clr_interval_attribute": "S",
								"clr_start_date": "D",
								"clr_end_date": "D",
								"clr_type": "S",
								"clr_status": "S",
								"clr_fld_id": "N",
								"createuser": "S",
								"createdate": "D",
								"updateuser": "S",
								"updatedate": "D",
								"lastmodified": "T",
							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(JSON.stringify(data));
						WebService
							.addData(url, data)
							.then(
								function(response) {
									var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
									var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
									var shortName = $scope.formData.clr_short_name;
									var longName = $scope.formData.clr_long_name;
									WorkflowService.updateConnectedDataWithProperties(
										$rootScope, diagramType,
										$scope.selectionId, $scope.clickedObjectId,
										externalId + '_' + response.keyValue,
										$scope.accumulationId, $rootScope.sourceId,
										shortName, longName);
									jAlert("Reward strategy added successfully");
									$scope.currentId = response.keyValue;
									$scope.loadAssociateRewards();
									$scope.loadMemberActionAttributes($scope.formData.clr_act_code);
									$scope.loadActionTypeAttributes();
									$rootScope.rewardstabs.activeTab = 1;
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to add reward strategy");
								});
					}

					$scope.addAssociateReward = function() {

						var url = "orchestrator/saveDetails"
						var data =

						{
							"wsCode": "",
							"action": "I",
							"tableName": "loy_reward_strategies",
							"keyColumn": "lrs_id",
							"keyValue": "",
							"columnValueMap": $scope.loadAssociateRewardsList,
							"columnDataTypeMap": {
								"lrs_id": "N",
								"lrs_clr_id": "N",
								"lrs_lrw_id": "N",
								"lrs_name": "S",
								"lrs_description": "S",
								"lrs_expiry_flag": "S",
								"lrs_validity": "N",
								"lrs_validity_unit": "S",
								"lrs_expiry_type": "S",
								"lrs_expiry_date": "D",
								"lrs_redeem_flag": "S",
								"lrs_redeem_clr_id": "S",
								"lrs_hold_flag": "S",
								"lrs_hold_validity_days": "N",
								"lrs_expiry_end_of_month_flag": "S"

							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(JSON.stringify(data));
						WebService
							.addData(url, data)
							.then(
								function(response) {
									jAlert("Associate reward added successfully");
									$rootScope.rewardstabs.activeTab = 2;
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to add associate reward");
								});
					}

				function escapeSingleQuotes(value) {
    // Escape single quotes by adding a backslash
    let escapedString = value.replace(/'/g, "\\'");
    
    // Remove a single backslash before a single quote
    escapedString = escapedString.replace(/\\\\'/g, "\\'"); // Double backslash escape in regex, replace with single backslash escape
    
    return escapedString;
}
			$scope.submitQualificationCriteria = function() {
				var url = "orchestrator/saveDetails"
						var childDataBean = {}; 
						var referenceColumnValueMap;
						console.log($scope.data);
						var data=$scope.selectionData;
				if ($scope.qualificationFormData.qcr_criteria_type == "exp") {
				    var escapedString = escapeSingleQuotes($scope.qualificationFormData.qcr_value2);
					var selectioncolumn = {
						"qcr_id": "",
						"qcr_ata_act_code": $scope.formData.clr_act_code,
						"qcr_ata_attribute_name":"Expression",
						"qcr_clr_id": $scope.currentId,
						"qcr_criteria_type": $scope.qualificationFormData.qcr_criteria_type,
						"qcr_criteria_no": 0,
						"qcr_condition_order": 0,
						"qcr_group_open_parenthesis": "",
						"qcr_group_close_parenthesis": "",
						"qcr_logical_operator": "",
						"qcr_operator": "",
						"qcr_value1": "",
						"qcr_value2": escapedString.trim(),
						"createuser":"",
						"createdate":"",
						"updateuser":"",
						"updatedate":"",
						"lastmodified":""
					}
					$scope.selectionData.push(selectioncolumn);
	                referenceColumnValueMap = {
								"qcr_clr_id": selectioncolumn.qcr_clr_id,
								"crt_criteria_no":selectioncolumn.qcr_criteria_no,
								"crt_criteria_text":escapedString.trim(),
							};
							
							childDataBean = {
								"wsCode": "",
								"action": "I",
								"tableName": "loy_criteria_reference",
								"keyColumn": "qcr_clr_id",
								"keyValue": "",
								"columnValueMap": [referenceColumnValueMap],
								"columnDataTypeMap": {
									"qcr_clr_id": "N",
									"crt_criteria_no":"N",
									"crt_criteria_text":"S"
								},
								"whereList": [],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							};
	
					    var data = {
						"wsCode": "",
						"action": "IU",
						"tableName": "loy_qualification_criteria",
						"keyColumn": "qcr_id",
						"keyValue": "",
						"columnValueMap": $scope.selectionData,
						"columnDataTypeMap": {
							"qcr_id": "N",
							"qcr_ata_act_code": "S",
							"qcr_ata_attribute_name": "S",
							"qcr_clr_id": "N",
							"qcr_criteria_type": "S",
							"qcr_criteria_no": "N",
							"qcr_condition_order": "N",
							"qcr_group_open_parenthesis": "S",
							"qcr_group_close_parenthesis": "S",
							"qcr_logical_operator": "S",
							"qcr_operator": "S",
							"qcr_value1": "S",
							"qcr_value2": "S",
							"createuser": "S",
							"createdate": "D",
							"updateuser": "S",
							"updatedate": "D",
							"lastmodified": "T"
						},
						"whereList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId,
						"childGetBean": [childDataBean]
					}
				}
				else if($scope.qualificationFormData.qcr_criteria_type == "qcr") {
					var referenceColumnValueMapArray = [];
						for (var i = 0; i < data.length; i++){
							 var criteriaText = data[i].qcr_group_open_parenthesis +
                           data[i].qcr_ata_attribute_name +
                           data[i].qcr_operator +
                           data[i].qcr_value1 +
                           data[i].qcr_group_close_parenthesis;
							var referenceColumnValueMap = {
								"qcr_clr_id": data[i].qcr_clr_id,
								"crt_criteria_no":data[i].qcr_criteria_no,
								"crt_criteria_text":criteriaText
							};
							referenceColumnValueMapArray.push(referenceColumnValueMap); 
						};
						childDataBean = {
								"wsCode": "",
								"action": "I",
								"tableName": "loy_criteria_reference",
								"keyColumn": "qcr_clr_id",
								"keyValue": "",
								"columnValueMap": referenceColumnValueMapArray,
								"columnDataTypeMap": {
								    "qcr_clr_id": "N",
									"crt_criteria_no":"N",
									"crt_criteria_text":"S"								
									},
								"whereList": [],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							};
					var data = {
						"wsCode": "",
						"action": "IU",
						"tableName": "loy_qualification_criteria",
						"keyColumn": "qcr_id",
						"keyValue": "",
						"columnValueMap": $scope.selectionData,
						"columnDataTypeMap": {
							"qcr_id": "N",
							"qcr_ata_act_code": "S",
							"qcr_ata_attribute_name": "S",
							"qcr_clr_id": "N",
							"qcr_criteria_type": "S",
							"qcr_criteria_no": "N",
							"qcr_condition_order": "N",
							"qcr_group_open_parenthesis": "S",
							"qcr_group_close_parenthesis": "S",
							"qcr_logical_operator": "S",
							"qcr_operator": "S",
							"qcr_value1": "S",
							"qcr_value2": "S",
							"createuser": "S",
							"createdate": "D",
							"updateuser": "S",
							"updatedate": "D",
							"lastmodified": "T"
						},
						"whereList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId,
						"childGetBean": [childDataBean]
					}
				}
				console.log(data);
				WebService
					.addData(url, data)
					.then(
						function(response) {
							jAlert("Qualification criteria added successfully");
							//$rootScope.rewardstabs.activeTab=3;
						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert("Failed to qualification criteria added ");
						});
			}
	
					$scope.aggregationCriteriaSubmit = function() {
						var url = "orchestrator/saveDetails"
						var data =

						{
							"wsCode": "",
							"action": "I",
							"tableName": "loy_aggregation_criteria",
							"keyColumn": "agr_id",
							"keyValue": "",
							"columnValueMap": [$scope.aggregationFormData],
							"columnDataTypeMap": {
								"agr_id": "N",
								"agr_clr_id": "N",
								"agr_aggregate_function": "S",
								"agr_value_attribute": "S",
								"agr_aggregate_value": "N",
								"agr_distinct_count_flag": "S",
								"agr_open_parenthesis": "S",
								"agr_close_parenthesis": "S",
								"agr_logical_operator": "S",
								"createuser": "S",
								"createdate": "D",
								"updateuser": "S",
								"updatedate": "D",
								"lastmodified": "T"

							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(JSON.stringify(data));
						WebService
							.addData(url, data)
							.then(
								function(response) {

									jAlert("Aggregation criteria added successfully");
									$rootScope.rewardstabs.activeTab = 4;
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to add aggregation criteria");
								});
					}
					$scope.submitComments = function() {
						var url = "orchestrator/saveDetails"
						var data = {
							"wsCode": "",
							"action": "U",
							"tableName": "loy_calculation_rule",
							"keyColumn": "clr_id",
							"keyValue": $scope.currentId,
							"columnValueMap": [$scope.commentsFormData],
							"columnDataTypeMap": {
								"clr_id": "N",
								"clr_long_name": "S"
							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}
						WebService
							.addData(url, data)
							.then(
								function(response) {

									jAlert("Comments added successfully");
									$rootScope.rewardstabs.activeTab = 4;
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to add comments");
								});
					}

				} else {
					domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;
					$scope.selectionId = clickedObjectTypeId;
					$scope.clickedObjectId = clickedObjectId;

					var selectionIdWithIdExternal = domainId;
					var splitSelectionIdWithIdExternal = selectionIdWithIdExternal.split("_");
					$scope.currentId = splitSelectionIdWithIdExternal[1];
					$scope.showExistingRewardStrategy = false;
					$scope.formData = {};
					$scope.commentsFormData = {}
					$scope.aggregationFormData = {}


					//loadAssociateRewards();
					$scope.getAssociateRewards = function() {
						$scope.loadAssociateRewardsList = [];
						var operatordata = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "lrs_clr_id",
							"tableNameList": ["loy_reward_strategies"],
							"filtersList": ["lrs_clr_id=" + $scope.currentId],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						}

						var url = "orchestrator/getData";
						WebService.addData(url, operatordata).then(function(response) {
							if (response.length == 0) {
								angular.forEach($scope.rewardsData, function(val, key) {
									$scope.loadAssociateRewardsList.push({
										"lrs_id": "",
										"lrs_clr_id": $scope.currentId,
										"lrs_lrw_id": val.lrw_id,
										"lrs_name": val.lrw_short_name,
										"lrs_description": "",
										"lrs_expiry_flag": "",
										"lrs_validity": "",
										"lrs_validity_unit": "",
										"lrs_expiry_type": "",
										"lrs_expiry_date": ""
									});
								})

							} else {
								for (var i = 0; i < response.length; i++) {
									if (response[i].columnList.lrs_expiry_date == 'null') {
										response[i].columnList.lrs_expiry_date = "";
									}
									$scope.loadAssociateRewardsList.push(response[i].columnList);
								}
							}
						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert(reason.failure
								|| "Something went wrong on loading reward strategies");
						});

					}

					/*function for qualification criteria*/
					$scope.loadMemberActionAttributes = function(type) {
						$scope.memberAttributesList = [];
						$scope.actionTypeAttributesList = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_action_type_attribute"],
							"filtersList": ["ATA_ACT_CODE=" + type],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data)
							.then(function(response) {
								for (var i = 0; i < response.length; i++) {
									if (type == 'MEMBER') {
										$scope.memberAttributesList.push(response[i].columnList);
									}
									else {
										$scope.actionTypeAttributesList.push(response[i].columnList);
									}

								}
							});
					}


					$scope.loadAssociateRewards = function() {
						$scope.rewardsData = [];

						var connectedDataModel = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray.length;
						if (connectedDataModel > 0) {
							for (var i = 0; i < connectedDataModel; i++) {
								var objectid = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].objectId
								var objectTypeId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].objectTypeId
								var domainid = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId;
								if (parseInt($rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
									if (domainid !== "" && domainid !== null && domainid !== undefined) {

										var splitDomain = domainid.split('_');
										//rewardsDomainId.push(splitDomain[1]);
										//$scope.isValidActionType(rewardsDomainId);
										var data = {
											"wsCode": "",
											"columnList": ["*"],
											"keyColumn": "lrw_id",
											"tableNameList": ["loy_rewards"],
											"filtersList": ["lrw_id=" + splitDomain[1]],
											"joinsList": [],
											"moduleCode": "",
											"objectCode": "",
											"csrfToken": $rootScope.SessionTokenId
										}

										var url = "orchestrator/getData";
										WebService.addData(url, data).then(function(response) {
											$scope.rewardsData.push(response[0].columnList);
											if ($scope.selectedActionTypes.length == 0) {
												if(response[0].columnList.lrw_act_code!=null){
													$scope.selectedActionTypes.push(response[0].columnList.lrw_act_code);
												}
												$scope.isValidActionTypeFlag = true;
											}
											else {
												angular.forEach($scope.selectedActionTypes, function(val, key) {
													if (val == response[0].columnList.lrw_act_code) {
														$scope.isValidActionTypeFlag = true;
														$scope.selectedActionTypes.push(response[0].columnList.lrw_act_code);
													}
													else {
														$scope.isValidActionTypeFlag = false;
														return;
													}
												})
											}
											//$scope.selectedActionTypes.push(response[0].lrw_act_code);
											if ($scope.isValidActionTypeFlag) {
												console.log($scope.isValidActionTypeFlag);
												$scope.showPropertyData = true;

											}

											$scope.getAssociateRewards();
											$scope.loadRewards();
										});
										//	get
										//							        	$rootScope.sourceId.push($rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId); 
										//							            $rootScope.sourceNames.push({'id':$rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId,'sourceName':$rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].shortName});
									}
									else {
										if (parseInt($rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
											var information = "A rewards strategy process box should have atleast one inputs with its properties set.";
											jAlert(information);
											$scope.showPropertyData = false;
											return false;
										}
									}
								}
							}
						}
						else {
							var information = "A rewards strategy process box should have atleast one inputs with its properties set.";
							jAlert(information);
							$scope.showPropertyData = false;
							return false;
							
						}
					}
					$scope.loadAssociateRewards();
					$scope.isEditing = true;
					$scope.id=$scope.currentId;
					
					
					loadEditRewardStrategyDetails();
					function loadEditRewardStrategyDetails() {
						$scope.isEditing = false;
						var operatordata = {
							"wsCode": "",
							"columnList": ["*"],
							/*"keyColumn": "clr_id",*/
							"tableNameList": ["loy_calculation_rule"],
							"filtersList": ["clr_id=" + $scope.currentId],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						}

						var url = "orchestrator/getData";
						WebService.addData(url, operatordata).then(function(response) {
							$scope.formData = response[0].columnList;
							$scope.commentsFormData.clr_long_name = $scope.formData.clr_long_name;
							//loadRewards($scope.formData.clr_act_code);
							//$scope.loadMemberActionAttributes($scope.formData.clr_act_code);
							$scope.loadQualificationEditData($scope.formData.clr_id);
							$scope.loadAggregationEditData();
							$scope.loadActionTypeAttributes();
							//$scope.loadMemberActionAttributes('MEMBER');

						})['catch'](function(reason) {
							$scope.error = reason;
							/*jAlert(reason.failure
								|| "Something went wrong on loading reward Strategy");*/
						});


					}

					$scope.loadExistingRewardStrategy = function(exr) {
						if (exr) {
							$scope.existingRewardStrategy = [];
							var data = {
								"wsCode": "",
								"columnList": ["*"],
								"keyColumn": "",
								"tableNameList": ["loy_reward_strategies"],
								"filtersList": [],
								"joinsList": [],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							};
							var url = "orchestrator/getData";
							WebService.addData(url, data).then(function(response) {
								for (var i = 0; i < response.length; i++) {
									$scope.existingRewardStrategy.push(response[i].columnList);
								}

							});

						}
					}


					/*functions  for qualification criteria*/
					$scope.loadQualificationEditData = function() {
						$scope.selectionData = [];
						
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_qualification_criteria"],
							"filtersList": ["qcr_clr_id=" + $scope.currentId],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						}
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
							   if (response[i].columnList.qcr_criteria_type == "exp") {
							        $scope.qualificationFormData.qcr_value2 = response[i].columnList.qcr_value2;
							    } else {
							        $scope.selectionData.push(response[i].columnList);
							    }
							}
						});
					}
					/*Add New Row*/
					$scope.addExpression = function(tablename) {
						var sortId = $scope.selectionData.length + 1;
						var selectioncolumn = {
							"qcr_id": "",
							"qcr_ata_act_code": $scope.formData.clr_act_code,
							"qcr_ata_attribute_name": "",
							"qcr_clr_id": $scope.currentId,
							"qcr_criteria_type": $scope.qualificationFormData.qcr_criteria_type,
							"qcr_criteria_no": sortId,
							"qcr_condition_order": sortId,
							"qcr_group_open_parenthesis": "",
							"qcr_group_close_parenthesis": "",
							"qcr_logical_operator": "",
							"qcr_operator": "",
							"qcr_value1": "",
							"qcr_value2": $scope.qualificationFormData.qcr_value2,
							"createuser": "",
							"createdate": "",
							"updateuser": "",
							"updatedate": "",
							"lastmodified": "",

						}
						$scope.selectionData.push(selectioncolumn);
					}

					$scope.getColumns = function(column, index) {
						$scope.selectedRowIndex = index;
						$scope.selectedColumn = column;
					}



		    /*Added function for push attributes*/
			$scope.pushQualificationAttributes = function(selectedCol,headername) {
				function typeInTextarea(element, value) {
        			 element.value = value;
				}
				if ($scope.qualificationFormData.qcr_criteria_type == "exp" | $scope.selectedColumn == 'E') {
	
					typeInTextarea(document.getElementById('text'),  headername+"."+selectedCol);
					return;
				} else if ($scope.selectionData.length == 0) {
					jAlert('Please select add before you pushing attribute.');
				}
				for (var i = 0; i < $scope.selectionData.length; i++) {
					if ($scope.selectedRowIndex == i) {
						$scope.selectionData[$scope.selectedRowIndex].qcr_ata_attribute_name = selectedCol;
						$scope.selectionData[$scope.selectedRowIndex].qcr_ata_act_code = $scope.formData.clr_act_code;
	
					}
				}
			}

					/*add function for aggregation criteria*/
					$scope.loadAggregationFunctions = function() {
						$scope.operatorsList = [];
						var operatordata = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "DLD_DLK_LOOKUP_NAME",
							"tableNameList": ["bas_lookup_details"],
							"filtersList": ["DLD_DLK_LOOKUP_NAME='AGGREGATE_FUNCTION'"],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						}

						var url = "orchestrator/getData";
						WebService.addData(url, operatordata).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.operatorsList.push(response[i].columnList);
							}

						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert(reason.failure
								|| "Something went wrong on loading operators");
						});


					}

					$scope.loadActionTypeAttributes = function() {
						$scope.actionTypeAttributesList = [];
						var operatordata = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "ATA_ACT_CODE",
							"tableNameList": ["loy_action_type_attribute"],
							"filtersList": ["ATA_ACT_CODE=" + $scope.formData.clr_act_code],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						}

						var url = "orchestrator/getData";
						WebService.addData(url, operatordata).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.actionTypeAttributesList.push(response[i].columnList);
							}

						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert(reason.failure
								|| "Something went wrong on loading action type attrributes");
						});


					}

					$scope.loadAggregationEditData = function() {
						var operatordata = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "agr_id",
							"tableNameList": ["LOY_AGGREGATION_CRITERIA"],
							"filtersList": ["agr_clr_id=" + $scope.currentId],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						}

						var url = "orchestrator/getData";
						WebService.addData(url, operatordata).then(function(response) {
							if (response.length > 0) {
								$scope.aggregationFormData = response[0].columnList;
							}
						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert(reason.failure
								|| "Something went wrong on loading aggregation edit data");
						});
					}


					$scope.addAssociateReward = function() {
						var url = "orchestrator/saveDetails"
						var data =
						{
							"wsCode": "",
							"action": "U",
							"tableName": "loy_reward_strategies",
							"keyColumn": "lrs_id",
							"keyValue": $scope.currentId,
							"columnValueMap": $scope.loadAssociateRewardsList,
							"columnDataTypeMap": {
								"lrs_id": "N",
								"lrs_clr_id": "N",
								"lrs_lrw_id": "N",
								"lrs_name": "S",
								"lrs_description": "S",
								"lrs_expiry_flag": "S",
								"lrs_validity": "N",
								"lrs_validity_unit": "S",
								"lrs_expiry_type": "S",
								"lrs_expiry_date": "D",
								"lrs_redeem_flag": "S",
								"lrs_redeem_clr_id": "S",
								"lrs_hold_flag": "S",
								"lrs_hold_validity_days": "N",
								"lrs_expiry_end_of_month_flag": "S"

							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(JSON.stringify(data));
						WebService
							.addData(url, data)
							.then(
								function(response) {

									jAlert("Associate reward add/updated successfully");
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to add associate reward");
								});
					}
					$scope.deleteReward = function(idx) {
						var id = $scope.loadAssociateRewardsList[idx].lrs_id;
						if (id != "") {
							jConfirm('Are you sure want to delete this reward?', 'Confirmation Dialog', function(r) {
								if (r) {
									$scope.loading = true;
									var url = 'orchestrator/deleteRowId';
									var data =
									{
										"keyValue": id,
										"tableName": "loy_reward_strategies",
										"columnheader": "lrs_id"
									}
									WebService.addData(url, data).then(function(response) {
										if (response.message.trim() == "success") {
											jAlert('Reward data deleted successfully');
											$scope.loadAssociateRewardsList.splice(idx, 1);
										}
										else {
											jAlert('Failed to delete reward')

										}
									})['catch'](function(reason) {
										jAlert(reason.failure || 'Failed to delete reward');
									})
								}
							});
						}
						else {
							$scope.loadAssociateRewardsList.splice(idx, 1);
						}
					}

					$scope.deleteColumn = function(idx) {
						var id = $scope.selectionData[idx].qcr_id;
						if (id != "") {
							jConfirm('Are you sure want to delete this qualification criteria?', 'Confirmation Dialog', function(r) {
								if (r) {
									var url = 'orchestrator/deleteRowId';
									var data =
									{
										"keyValue": id,
										"tableName": "loy_qualification_criteria",
										"columnheader": "qcr_id"
									}
									WebService.addData(url, data).then(function(response) {
										if (response.message.trim() == "success") {
											jAlert('Qualification criteria deleted successfully');
											$scope.selectionData.splice(idx, 1);
											$scope.loading = false;
										}
										else {
											$scope.loading = false;
											jAlert('Failed to delete qualification criteria')

										}
									})['catch'](function(reason) {
										$scope.loading = false;
										jAlert(reason.failure || 'Failed to delete qualification criteria');
									})
								}
							})
						}
						else {
							$scope.selectionData.splice(idx, 1);
						}
						//						var index = $rootScope.selectionData.indexOf(col);
						//						$rootScope.selectionData.splice(index, 1);

					}

					$scope.submit = function() {

						var url = "orchestrator/saveDetails"
						var data =

						{
							"wsCode": "",
							"action": "U",
							"tableName": "loy_calculation_rule",
							"keyColumn": "clr_id",
							"keyValue": $scope.currentId,
							"columnValueMap": [$scope.formData],
							"columnDataTypeMap": {
								"clr_id": "N",
								"clr_short_name": "S",
								"clr_long_name": "S",
								"clr_act_code": "S",
								"clr_applied_on": "S",
								"clr_prm_code": "N",
								"clr_ptn_level": "S",
								"clr_ptn_org_id": "N",
								"clr_repeate_action": "S",
								"clr_interval_attribute": "S",
								"clr_start_date": "D",
								"clr_end_date": "D",
								"clr_type": "",
								"clr_status": "",
								"clr_fld_id": "N",
								"createuser": "S",
								"createdate": "D",
								"updateuser": "S",
								"updatedate": "D",
								"lastmodified": "T"

							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(JSON.stringify(data));
						WebService
							.addData(url, data)
							.then(
								function(response) {
									var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
									var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
									var shortName = $scope.formData.clr_short_name;
									var longName = $scope.formData.clr_long_name;
									WorkflowService.updateConnectedDataWithProperties(
										$rootScope, diagramType,
										$scope.selectionId, $scope.clickedObjectId,
										externalId + '_' + response.keyValue,
										$scope.accumulationId, $rootScope.sourceId,
										shortName, longName);
									jAlert("Reward strategy updated successfully");
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to update reward strategy");
								});
					}

					
			function escapeSingleQuotes(value) {
    // Escape single quotes by adding a backslash
    let escapedString = value.replace(/'/g, "\\'");
    
    // Remove a single backslash before a single quote
    escapedString = escapedString.replace(/\\\\'/g, "\\'"); // Double backslash escape in regex, replace with single backslash escape
    
    return escapedString;
}
			$scope.submitQualificationCriteria = function() {
				var url = "orchestrator/saveDetails"
						var childDataBean = {}; 
						var referenceColumnValueMap;
						console.log($scope.data);
						var data=$scope.selectionData;
				if ($scope.qualificationFormData.qcr_criteria_type == "exp") {
				    var escapedString = escapeSingleQuotes($scope.qualificationFormData.qcr_value2);
					var selectioncolumn = {
						"qcr_id": "",
						"qcr_ata_act_code": $scope.formData.clr_act_code,
						"qcr_ata_attribute_name":"Expression",
						"qcr_clr_id": $scope.currentId,
						"qcr_criteria_type": $scope.qualificationFormData.qcr_criteria_type,
						"qcr_criteria_no": 0,
						"qcr_condition_order": 0,
						"qcr_group_open_parenthesis": "",
						"qcr_group_close_parenthesis": "",
						"qcr_logical_operator": "",
						"qcr_operator": "",
						"qcr_value1": "",
						"qcr_value2": escapedString.trim(),
						"createuser":"",
						"createdate":"",
						"updateuser":"",
						"updatedate":"",
						"lastmodified":""
					}
					$scope.selectionData.push(selectioncolumn);
	                referenceColumnValueMap = {
								"qcr_clr_id": selectioncolumn.qcr_clr_id,
								"crt_criteria_no":selectioncolumn.qcr_criteria_no,
								"crt_criteria_text":escapedString.trim(),
							};
							
							childDataBean = {
								"wsCode": "",
								"action": "I",
								"tableName": "loy_criteria_reference",
								"keyColumn": "qcr_clr_id",
								"keyValue": "",
								"columnValueMap": [referenceColumnValueMap],
								"columnDataTypeMap": {
									"qcr_clr_id": "N",
									"crt_criteria_no":"N",
									"crt_criteria_text":"S"
								},
								"whereList": [],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							};
	
					    var data = {
						"wsCode": "",
						"action": "IU",
						"tableName": "loy_qualification_criteria",
						"keyColumn": "qcr_id",
						"keyValue": "",
						"columnValueMap": $scope.selectionData,
						"columnDataTypeMap": {
							"qcr_id": "N",
							"qcr_ata_act_code": "S",
							"qcr_ata_attribute_name": "S",
							"qcr_clr_id": "N",
							"qcr_criteria_type": "S",
							"qcr_criteria_no": "N",
							"qcr_condition_order": "N",
							"qcr_group_open_parenthesis": "S",
							"qcr_group_close_parenthesis": "S",
							"qcr_logical_operator": "S",
							"qcr_operator": "S",
							"qcr_value1": "S",
							"qcr_value2": "S",
							"createuser": "S",
							"createdate": "D",
							"updateuser": "S",
							"updatedate": "D",
							"lastmodified": "T"
						},
						"whereList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId,
						"childGetBean": [childDataBean]
					}
				}
				else if($scope.qualificationFormData.qcr_criteria_type == "qcr") {
					var referenceColumnValueMapArray = [];
						for (var i = 0; i < data.length; i++){
							 var criteriaText = data[i].qcr_group_open_parenthesis +
                           data[i].qcr_ata_attribute_name +
                           data[i].qcr_operator +
                           data[i].qcr_value1 +
                           data[i].qcr_group_close_parenthesis;
							var referenceColumnValueMap = {
								"qcr_clr_id": data[i].qcr_clr_id,
								"crt_criteria_no":data[i].qcr_criteria_no,
								"crt_criteria_text":criteriaText
							};
							referenceColumnValueMapArray.push(referenceColumnValueMap); 
						};
						childDataBean = {
								"wsCode": "",
								"action": "I",
								"tableName": "loy_criteria_reference",
								"keyColumn": "qcr_clr_id",
								"keyValue": "",
								"columnValueMap": referenceColumnValueMapArray,
								"columnDataTypeMap": {
								    "qcr_clr_id": "N",
									"crt_criteria_no":"N",
									"crt_criteria_text":"S"								
									},
								"whereList": [],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							};
					var data = {
						"wsCode": "",
						"action": "IU",
						"tableName": "loy_qualification_criteria",
						"keyColumn": "qcr_id",
						"keyValue": "",
						"columnValueMap": $scope.selectionData,
						"columnDataTypeMap": {
							"qcr_id": "N",
							"qcr_ata_act_code": "S",
							"qcr_ata_attribute_name": "S",
							"qcr_clr_id": "N",
							"qcr_criteria_type": "S",
							"qcr_criteria_no": "N",
							"qcr_condition_order": "N",
							"qcr_group_open_parenthesis": "S",
							"qcr_group_close_parenthesis": "S",
							"qcr_logical_operator": "S",
							"qcr_operator": "S",
							"qcr_value1": "S",
							"qcr_value2": "S",
							"createuser": "S",
							"createdate": "D",
							"updateuser": "S",
							"updatedate": "D",
							"lastmodified": "T"
						},
						"whereList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId,
						"childGetBean": [childDataBean]
					}
				}
				console.log(data);
				WebService
					.addData(url, data)
					.then(
						function(response) {
							jAlert("Qualification criteria added successfully");
							//$rootScope.rewardstabs.activeTab=3;
						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert("Failed to qualification criteria added ");
						});
			}
						
					$scope.aggregationCriteriaSubmit = function() {

						var url = "orchestrator/saveDetails"
						var data =

						{
							"wsCode": "",
							"action": $scope.aggregationFormData.agr_id ? "U" : "I",
							"tableName": "loy_aggregation_criteria",
							"keyColumn": "agr_id",
							"keyValue": $scope.aggregationFormData.agr_id ? $scope.aggregationFormData.agr_id : '',
							"columnValueMap": [$scope.aggregationFormData],
							"columnDataTypeMap": {
								"agr_id": "N",
								"agr_clr_id": "N",
								"agr_aggregate_function": "S",
								"agr_value_attribute": "S",
								"agr_aggregate_value": "N",
								"agr_distinct_count_flag": "S",
								"agr_open_parenthesis": "S",
								"agr_close_parenthesis": "S",
								"agr_logical_operator": "S",
								"createuser": "S",
								"createdate": "D",
								"updateuser": "S",
								"updatedate": "D",
								"lastmodified": "T"

							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(JSON.stringify(data));
						WebService
							.addData(url, data)
							.then(
								function(response) {
									jAlert("Aggregation criteria updated successfully");
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to updated aggregation criteria");
								});
					}

					$scope.submitComments = function() {
						var url = "orchestrator/saveDetails"
						var data = {
							"wsCode": "",
							"action": "U",
							"tableName": "loy_calculation_rule",
							"keyColumn": "clr_id",
							"keyValue": $scope.formData.clr_id,
							"columnValueMap": [$scope.commentsFormData],
							"columnDataTypeMap": {
								"clr_id": "N",
								"clr_long_name": "S"
							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}
						WebService
							.addData(url, data)
							.then(
								function(response) {
									jAlert("Comments updated successfully");
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to update comments");
								});
					}

				}
				break;

			case 'aggregationcriteria':


				break;


			case 'qualificationcriteria':


				break;
			case 'accumulationprocess':
				//	$scope.formData={};
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/accumulation/accumulation/addAccumulationProcess.html';
				//loadRewardsStrategies();				
				if ($scope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId === null
					|| $scope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId === "") {
					boxInfo = {
						'workflowId': $rootScope.workflowId,
						'selectionId': clickedObjectTypeId,
						'newObjectId': clickedObjectId
					}
                    $scope.currentObjectId;
					$scope.selectionId = clickedObjectTypeId;
					$scope.clickedObjectId = clickedObjectId;


					loadNotificationMessages();
					loadNotificationType();
					//loadAccumulationData();
					loadRewardsStrategies();
					$scope.formData = {};
					//for loading notttification messages
					function loadNotificationMessages() {
						$scope.notificationMessages = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_notification_messages"],
							"filtersList": [],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.notificationMessages.push(response[i].columnList);
							}

						});
					}
					//for loading notttification types
					function loadNotificationType() {
						$scope.notificationTypes = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["bas_lookup_details"],
							"filtersList": ['DLD_DLK_LOOKUP_NAME=AUS_NOTIFY'],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.notificationTypes.push(response[i].columnList);
							}

						});
					}
					//For loading accumulation data
					function loadAccumulationData() {
						//alert($scope.accumulationId);
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_accumulation_process"],
							"filtersList": ["lap_id=" + $scope.accumulationId],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							$scope.formData = response[0].columnList;

						});
					}
					function loadRewardsStrategies() {

						var rewardsStrategyId = null;
						var connectedDataModel = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray.length;
						if (connectedDataModel > 0) {
							//var rewardsDomainId=[];
							for (var i = 0; i < connectedDataModel; i++) {
								var objectid = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].objectId
								var objectTypeId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].objectTypeId
								var domainid = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId;
								if (parseInt($rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
									//rewardsStrategyId = $rootScope.connectedData.objectTypeArray[i].objectArray[j].domainId;
									loadRewardsStrategy(domainid);

								}
							}
						}
					}
					function loadRewardsStrategy(id) {
						$scope.rewardStrategyDetail = [];
						var splitRsId = id.split('_');
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_calculation_rule"],
							"filtersList": [
								"CLR_ID=" + splitRsId[1]
							],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							$scope.rewardStrategyDetail.push(response[0].columnList);
						});
					}


					$scope.submit = function() {
						var associateRewardDetails = [];
						$scope.formData.lap_prg_id = $scope.programId;
						console.log($scope.formData);
						angular.forEach($scope.rewardStrategyDetail, function(value, key) {
							associateRewardDetails.push({
								'rpd_lap_id': $scope.formData.lap_id,
								'rpd_clr_id': value.clr_id,
								'rpd_start_date': '',
								'rpd_include_flag': value.checked ? 'Y' : 'N',
								'sort_order': key
							})
						})
						var url = "orchestrator/saveDetails"
						var data =

						{
							"wsCode": "",
							"action": $scope.currentObjectId?"IU":"I",
							"tableName": "loy_accumulation_process",
							"keyColumn": "lap_id",
							"keyValue": "",
							"columnValueMap": [$scope.formData],
							"columnDataTypeMap": {
								'lap_id': 'N',
								'lap_short_name': 'S',
								'lap_long_name': 'S',
								'lap_prg_id': 'N',
								'lap_notification_flag': 'S',
								'lap_notification_type': 'S',
								'lap_notification_msg_id': 'N',
								'lap_bal_notification_flag': 'S',
								'lap_bal_notification_type': 'S',
								'lap_balance_msg_id': 'N',
								'lap_schedule_id': 'N',
								'lap_status': 'S',
								'lap_comments': 'S',
								'createuser': 'S',
								'createdate': 'D',
								'updateuser': 'S',
								'updatedate': 'D',
								'lastmodified': 'T',
								'lap_acctype': 'S'
							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": [{
								"wsCode": "",
								"action": $scope.currentObjectId?"IU":"I",
								"tableName": "loy_reward_process_details",
								"keyColumn": "rpd_lap_id",//RPD_LAP_ID
								"keyValue": "",
								"columnValueMap": associateRewardDetails,
								"columnDataTypeMap": {
									"rpd_lap_id": "N",
									"rpd_clr_id": "N",
									"rpd_start_date": "N",
									"rpd_include_flag": "S",
									"sort_order": "S"
								},
								"whereList": [],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId,
								"childGetBean": []

							}]
						}

						console.log(JSON.stringify(data));
						WebService
							.addData(url, data)
							.then(
								function(response) {

									var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
									var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
									var shortName = $scope.formData.lap_short_name;
									var longName = $scope.formData.lap_long_name;
									WorkflowService.updateConnectedDataWithProperties(
										$rootScope, diagramType,
										$scope.selectionId, $scope.clickedObjectId,
										externalId + '_' + response.keyValue,
										$scope.accumulationId, $rootScope.sourceId,
										shortName, longName);
									$scope.currentObjectId=response.keyValue;
									jAlert("Accumulation process added successfully");
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to add accumulation process");
								});
					}

				}
				else {
					$scope.templateUrl = CJApp.templatePath
						+ '/programs/accumulation/accumulation/addAccumulationProcess.html';
					domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;
					var splitDomId = domainId.split("_");
					$scope.lrwid = parseInt(splitDomId[1]);
					$scope.selectionId = clickedObjectTypeId;
					$scope.clickedObjectId = clickedObjectId;

					$scope.formData = {};
					loadAccumulationList("load");
					loadAccumulationProcessList();
					loadNotificationMessages();
					loadNotificationType();
					loadRewardsStrategies();

					function loadRewardsStrategies() {

						var rewardsStrategyId = null;
						var connectedDataModel = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray.length;
						if (connectedDataModel > 0) {
							//var rewardsDomainId=[];
							for (var i = 0; i < connectedDataModel; i++) {
								var objectid = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].objectId
								var objectTypeId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].objectTypeId
								var domainid = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId;
								if (parseInt($rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
									//rewardsStrategyId = $rootScope.connectedData.objectTypeArray[i].objectArray[j].domainId;
									loadRewardsStrategy(domainid);

								}
							}
						}
					}
					//for loading notttification messages
					function loadNotificationMessages() {
						$scope.notificationMessages = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_notification_messages"],
							"filtersList": [],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.notificationMessages.push(response[i].columnList);
							}

						});
					}

					function loadAccumulationList() {

						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_accumulation_process"],
							"filtersList": ["lap_id=" + $scope.lrwid],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							$scope.formData = response[0].columnList;

						});
					}
					function loadAccumulationProcessList() {
						$scope.rewardsProcessDetails = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_reward_process_details"],
							"filtersList": ["rpd_lap_id=" + $scope.lrwid],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.rewardsProcessDetails.push(response[i].columnList)
							}

							console.log($scope.rewardsProcessDetails)
						});
					}
					//for loading notttification types
					function loadNotificationType() {
						$scope.notificationTypes = [];
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["bas_lookup_details"],
							"filtersList": ['DLD_DLK_LOOKUP_NAME=AUS_NOTIFY'],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.notificationTypes.push(response[i].columnList);
							}

						});
					}
					function loadRewardsStrategy(id) {
						$scope.rewardStrategyDetail = [];
						var splitRsId = id.split('_');
						var data = {
							"wsCode": "",
							"columnList": ["*"],
							"keyColumn": "",
							"tableNameList": ["loy_calculation_rule"],
							"filtersList": ["clr_id=" + splitRsId[1]],
							"joinsList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						};
						var url = "orchestrator/getData";
						WebService.addData(url, data).then(function(response) {
							for (var i = 0; i < response.length; i++) {
								//angular.forEach()
								$scope.rewardStrategyDetail.push(response[i].columnList);
							}



						});
					}
					$scope.submit = function() {
						$scope.formData.lap_prg_id = $scope.programId;
						console.log($scope.formData);
						var url = "orchestrator/saveDetails"
						var data =

						{
							"wsCode": "",
							"action": "U",
							"tableName": "loy_accumulation_process",
							"keyColumn": "lap_id",
							"keyValue": $scope.lrwid,
							"columnValueMap": [$scope.formData],
							"columnDataTypeMap": {
								'lap_id': 'N',
								'lap_short_name': 'S',
								'lap_long_name': 'S',
								'lap_prg_id': 'N',
								'lap_notification_flag': 'S',
								'lap_notification_type': 'S',
								'lap_notification_msg_id': 'N',
								'lap_bal_notification_flag': 'S',
								'lap_bal_notification_type': 'S',
								'lap_balance_msg_id': 'N',
								'lap_schedule_id': 'N',
								'lap_status': 'S',
								'lap_comments': 'S',
								'createuser': 'S',
								'createdate': 'D',
								'updateuser': 'S',
								'updatedate': 'D',
								'lastmodified': 'T',
								'lap_acctype': 'S'
							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": []
						}

						console.log(JSON.stringify(data));
						WebService
							.addData(url, data)
							.then(
								function(response) {

									var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
									var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
									var shortName = $scope.formData.lap_short_name;
									var longName = $scope.formData.lap_long_name;
									WorkflowService.updateConnectedDataWithProperties(
										$rootScope, diagramType,
										$scope.selectionId, $scope.clickedObjectId,
										externalId + '_' + response.keyValue,
										$scope.accumulationId, $rootScope.sourceId,
										shortName, longName);
									jAlert("Accumulation process edited successfully");
								})['catch'](function(reason) {
									$scope.error = reason;
									jAlert("Failed to edit accumulation process");
								});
					}

				}
				break;
			case 'segment':
				$scope.showPropertyData = true;
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/tactic/segment/addSegment.html';
				var domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;// "11";
				var splitSelectionIdWithIdExternal = domainId.split("_");
				$scope.currentId = splitSelectionIdWithIdExternal[1]
				if (!$scope.currentId) {
					$scope.action = 'add';
					$scope.formData = {
						'segmentid': '',
						'workflowid': $scope.workflowId,
						'noofsplit': '',
						'mutualflag': 'N',
						'createdate': '',
						'createuser': '',
						'updatedate': '',
						'updateuser': '',
						'lastmodified': '',
					};
				}
				else {
					$scope.action = 'edit';
					loadEditSegmentData($scope.currentId);
				}
				$scope.selectionId = clickedObjectTypeId;
				$scope.clickedObjectId = clickedObjectId;
				$scope.operatorsList = [];
				$rootScope.attributesplitdetails = [];
				$rootScope.criteriaSplitDetails = [];
				$scope.columnList = [];
				$scope.tableList = [];
				$rootScope.criteriaSplitArray = [];
				$scope.persistTableList = [];
				$scope.showPersistForSegment = true;
				
				function loadEditSegmentData(id) {

		var data = {
			"wsCode" : "",
			"columnList" : [ "*" ],
			"keyColumn" : "segmentid",
			"tableNameList" : [ "segment" ],
			"filtersList" : [ "segmentid=" + id ],
			"joinsList" : [],
			"moduleCode" : "",
			"objectCode" : "",
			"csrfToken" : $rootScope.SessionTokenId
		}

		var url = "orchestrator/getData";
		WebService
				.addData(url, data)
				.then(
						function(segmentResponse) {
							for (var i = 0; i < segmentResponse.length; i++) {
								$scope.formData = segmentResponse[0].columnList;
								$scope.criteriaSegmentType = $scope.formData.segementtype;
							}

							if ($scope.formData.segementtype == 'A'
									|| $scope.formData.segementtype == 'B') {
								loadEditSegmentDetails($scope.currentId);
								var columnNames = {
									"wsCode" : "",
									"columnList" : [ "*" ],
									"keyColumn" : "tdcid",
									"tableNameList" : [ "sysdictionarycols" ],
									"filtersList" : [ "tablename='"
											+ $scope.formData.tablename + "'" ],
									"joinsList" : [],
									"moduleCode" : "",
									"objectCode" : "",
									"csrfToken" : $rootScope.SessionTokenId
								};
								var url = "orchestrator/getData";
								$scope.columnList = [];
								WebService
										.addData(url, columnNames)
										.then(
												function(response) {
													for (var i = 0; i < response.length; i++) {
														$scope.columnList
																.push(response[i].columnList);
													}

												});
							} else {
								loadEditSegment_Criteria_Details($scope.currentId);

							}

						})['catch'](function(reason) {
			$scope.error = reason;

		});
	}

	//to load the SegmentsDetails
	function loadEditSegmentDetails(id) {

		var data = {
			"wsCode" : "",
			"columnList" : [ "*" ],
			"keyColumn" : "segmentid",
			"tableNameList" : [ "segment_details" ],
			"filtersList" : [ "segmentid=" + id ],
			"joinsList" : [],
			"moduleCode" : "",
			"objectCode" : "",
			"csrfToken" : $rootScope.SessionTokenId
		}

		var url = "orchestrator/getData";
		WebService.addData(url, data).then(function(response) {
			for (var i = 0; i < response.length; i++) {
				$rootScope.criteriaSplitDetails.push(response[i].columnList);

			}

		})['catch'](function(reason) {
			$scope.error = reason;

		});

	}

	function loadEditSegment_Criteria_Details(id) {

		WebService
				.GetData("orchestrator/getSegmentDetails/" + id + "/C")
				.then(
						function(response) {
							$rootScope.criteriaSplitDetails = response;

							for (var i = 0; i < $rootScope.criteriaSplitDetails.length; i++) {

								var data = {
									"wsCode" : "",
									"columnList" : [ "*" ],
									"keyColumn" : "segmentdetailid",
									"tableNameList" : [ "segment_criteria_details" ],
									"filtersList" : [ "segmentdetailid="
											+ $rootScope.criteriaSplitDetails[i].segmentdetailid ],
									"joinsList" : [],
									"moduleCode" : "",
									"objectCode" : "",
									"csrfToken" : $rootScope.SessionTokenId
								};
								var url = "orchestrator/getData";
								WebService
										.addData(url, data)
										.then(
												function(criteriaResponse) {
													var criteriaEditArray = [];
													for (var j = 0; j < criteriaResponse.length; j++) {
														criteriaEditArray
																.push(criteriaResponse[j].columnList);

													}
													$rootScope.criteriaSplitArray
															.push(criteriaEditArray);

												});

							}

						})['catch'](function(reason) {
			$scope.error = reason;

		});

	}
				// to loadtableList
				function loadPersistTableList() {
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "TSDID",
						"tableNameList": ["systemdictionary"],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.persistTableList.push(response[i].columnList);
						}

					});
				}
				/*$scope.getTables = function() {
				    if ($scope.tacticDetail.wfd_catlogueid == null) {
				        loadTableAndSegmentData();
				    } else {
				        loadTableCatalogue();
				    }
				}*/
				
				$scope.getTables = function(type) {
					if ($scope.tacticDetail.wfd_catlogueid != null) {
				        loadPersistTableList();
				    } else {
				        loadTableCatalogue();
				    }
     			}
				
				function loadTableCatalogue() {
				    $scope.persistTableList = [];
				    var url = "orchestrator/getTablecatalogue/" + $scope.workflowId;
				    WebService.GetData(url).then(function(response) {
				        for (var i = 0; i < response.length; i++) {
				            var tablename = {"tablename": response[i].columnList.tablename};
				            $scope.persistTableList.push(tablename);
				        }
				    });
				}
				
				
				/*function loadTableAndSegmentData() {
				    $scope.tables = [];
				    var data = {
				        "wsCode": "",
				        "columnList": ["*"],
				        "keyColumn": "tsdid",
				        "tableNameList": ["systemdictionary"],
				        "filtersList": [],
				        "joinsList": [],
				        "moduleCode": "",
				        "objectCode": "",
				        "csrfToken": $rootScope.SessionTokenId
				    };
				    var url = "orchestrator/getData";
				    WebService.addData(url, data)
				        .then(function(response) {
				            for (var i = 0; i < response.length; i++) {
				                $scope.tables.push(response[i].columnList);
				            }
				        });
				}
*/
				var connectedDataModel = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray.length;

				for (var i = 0; i < connectedDataModel; i++) {
					var objectid = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].objectId
					var objectTypeId = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].objectTypeId

					var domainid = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId;
					$rootScope.sourceId = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].metaDataId;
					if (domainid === "" || domainid === " " || domainid === null
						|| domainid === undefined) {
						if (parseInt($rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
							var information = "A segment process box should have atleast one inputs with its properties set.";
							jAlert(information);
							return false;
						}
					}
				}
				console.log(domainid);
				var splitDomId = domainid.split("-");
				//var sourceExternalId = splitDomId[0];
				$scope.metaDataId = splitDomId[0];

				loadOperators();
				loadtableList();

				/* getting operators names */
				function loadOperators() {
					var operatordata = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "DLD_LOOKUP_CODE",
						"tableNameList": ["IMPORT_LOOKUP_DETAILS"],
						"filtersList": ["DLD_DLK_LOOKUP_NAME='OPERATOR'"],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					}

					var url = "orchestrator/getData";
					WebService.addData(url, operatordata).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.operatorsList.push(response[i].columnList);
						}

					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure
							|| "Something went wrong on loading operators");
					});
				}

				// to loadtableList
				function loadtableList() {
					var tableNames = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "tsdid",
						"tableNameList": ["systemdictionary"],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, tableNames).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.tableList.push(response[i].columnList);
						}

					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure
							|| "Something went wrong on loading table list");
					});
				}

				// to to get input sourceId
				$scope.getSourceId = function(tableName) {
					var url = "orchestrator/getData";
					var sourceColumns = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "tsdid",
						"tableNameList": ["systemdictionary"],
						"filtersList": ["tablename='" + tableName + "'"],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					WebService.addData(url, sourceColumns).then(function(sourceIdresponse) {
						for (var i = 0; i < sourceIdresponse.length; i++) {
							$scope.formData.inputsourceid = sourceIdresponse[i].columnList.datasource;
						}
					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure
							|| "Something went wrong on loading source id");
					});
				}
				// to get column List
				$scope.getColumnList = function(tablename) {

					var columnNames = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "tdcid",
						"tableNameList": ["sysdictionarycols"],
						"filtersList": ["tablename='" + tablename + "'"],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					$scope.columnList = [];
					WebService.addData(url, columnNames).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.columnList.push(response[i].columnList);
						}

					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure
							|| "Something went wrong on loading columns");
					});

				}

				//add selection Criteria popup
				$scope.addCriteriaSplitrow = function() {
					var templateUrl = CJApp.templatePath
						+ '/programs/tactic/segment/selectionCriteria.html';
					uiPopupFactory.open(templateUrl, "selectionCriteriaController", "md",
						'static', 'Workflow', 'list', '', 'Add Segment Criteria',
						$rootScope.criteriaSplitDetails);

				}
				

				//need to change logic
				$scope.deleteCriteriaRow = function(index, col) {
					$rootScope.criteriaSplitDetails.splice(index, 1);
				}
				$scope.deleteAttributeRow = function(index, col) {
					$rootScope.criteriaSplitDetails.splice(index, 1);
				}
				$scope.deleteBinaryRow = function(index, col) {
					$rootScope.criteriaSplitDetails.splice(index, 1);
				}

				$scope.addBinarySplitrow = function() {

					$rootScope.criteriaSplitDetails = [{
						'segmentdetailid': '',
						'segmentid': '',
						'splitname': '',
						'splitnumber': 0,
						'splitoperator': '',
						'splitvalue': '',
						'selectionid': '',
						'criteria': ''

					}, {
						'segmentdetailid': '',
						'segmentid': '',
						'splitname': '',
						'splitnumber': 1,
						'splitoperator': '',
						'splitvalue': '',
						'selectionid': '',
						'criteria': ''

					}];

				}

				$scope.addAttributeSplitrow = function(tablename, AttributeName) {
					$scope.showProfile = false;
					var index = $rootScope.criteriaSplitDetails.length + 0;
					var sortId = $rootScope.criteriaSplitDetails.length + 1;
					var columnNames = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "tsdid",
						"tableNameList": ["sysdictionarycols"],
						"filtersList": [ "tablename='" + tablename + "'","columnname='"
					+ AttributeName + "'"],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, columnNames).then(function(response) {
						if (response[0].columnList.tdc_frequency_flag == 'Y') {
							$scope.showProfile[index] = true;
						} else {
							$scope.showProfile[index] = false;
						}
						var segmentAttributeSplit = {
							'segmentdetailid': '',
							'segmentid': '',
							'splitname': '',
							//	'splitnumber' : sortId,
							'splitnumber': index,
							'splitoperator': '',
							'splitvalue': '',
							'selectionid': '',
							'criteria': ''
						}
						$rootScope.criteriaSplitDetails.push(segmentAttributeSplit);
					})['catch'](function(reason) {
						//$scope.error = reason;
						jAlert("Sysdictionary columns not mapped against selected table");
					});
				}

				$scope.submit = function() {

					$rootScope.criteriaSplitDetails = $filter('filter')(

						$rootScope.criteriaSplitDetails,

						function(item) {
 
							if ($scope.formData.segementtype == 'C') {

								delete item.splitoperator;

								delete item.splitvalue;

								delete item.criteria;

							} else if ($scope.formData.segementtype == 'A'

								|| $scope.formData.segementtype == 'B') {

								delete item.criteria;

							}
 
							return item;

						});
 
					$scope.formData.noofsplit = $rootScope.criteriaSplitDetails.length;

					var url = "orchestrator/saveDetails";

					if ($scope.formData.segementtype == 'A'

						|| $scope.formData.segementtype == 'B') {
							
						var data = {
				"wsCode" : "",
				"action" : "I",
				"tableName" : "segment",
				"keyColumn" : "segmentid",
				"keyValue" : "",
				"columnValueMap" : [ $scope.formData ],

				"columnDataTypeMap" : {
					"segmentid" : "N",
					"workflowid" : "N",
					"noofsplit" : "N",
					"mutualflag" : "S",
					"createdate" : "D",
					"createuser" : "S",
					"updatedate" : "D",
					"updateuser" : "S",
					"lastmodified" : "T",
					"inputtype" : "S",
					"segmentname" : "S",
					"segementtype" : "S",
					"segmentdescription" : "S",
					"tablename" : "S",
					"sourcecolumn" : "S",
					"inputsourceid" : "N",
					"persistflag":"S",
					"persisttable":"S"
				},
				"whereList" : [],
				"moduleCode" : "",
				"objectCode" : "",
				"csrfToken" : $rootScope.SessionTokenId,
				"childGetBean" : [ {
					"wsCode" : "",
					"action" : "I",
					"tableName" : "segment_details",
					"keyColumn" : "segmentdetailid",
					"keyValue" : "",
					"columnValueMap" : JSON.parse(angular
							.toJson($rootScope.criteriaSplitDetails)),
					"columnDataTypeMap" : {
						"segmentdetailid" : "N",
						"segmentid" : "N",
						"splitname" : "S",
						"splitnumber" : "N",
						"selectionid" : "N",
						"splitoperator" : "S",
						"splitvalue" : "S"

					},
					"whereList" : [

					],
					"moduleCode" : "",
					"objectCode" : "",
					"csrfToken" : $rootScope.SessionTokenId
				} ]
			}	
							
					}

					else if ($scope.formData.segementtype == 'C') {
 
						$scope.finalSegmentCriteriaArray = [];

						for (var i = 0; i < $rootScope.criteriaSplitDetails.length; i++) {

							var segmentAndSegmentCriteria = {

								"wsCode": "",

								"action": "I",

								"tableName": "segment_details",

								"keyColumn": "segmentdetailid",

								"keyValue": "",

								"columnValueMap": [$rootScope.criteriaSplitDetails[i]],

								"columnDataTypeMap": {

									"segmentdetailid": "N",

									"segmentid": "N",

									"splitname": "S",

									"splitnumber": "N",

									"selectionid": "N"
 
								},

								"whereList": [],

								"childGetBean": [{

									"wsCode": "",

									"action": "I",

									"tableName": "segment_criteria_details",

									"keyColumn": "segmentcriteriadetailsid",

									"keyValue": "",

									"columnValueMap": $rootScope.criteriaSplitArray[i],

									"columnDataTypeMap": {

										"segmentcriteriadetailsid": "N",

										"segmentdetailid": "N",

										"tablename": "S",

										"columnname": "S",

										"operator": "S",

										"value": "S",

										"sortid": "N",

										"logicaloperator": "S",

										"criteriasplitnumber": "N"

									},

									"whereList": [],

									"moduleCode": "",

									"objectCode": "",

									"csrfToken": $rootScope.SessionTokenId,

									"childGetBean": []
 
								}]
 
							};

							//}

							$scope.finalSegmentCriteriaArray

								.push(segmentAndSegmentCriteria);

						}
 
						$scope.formData.inputsourceid = $rootScope.inputsourceid;

						//function addsegmentDetails(){

						var data = {

							"wsCode": "",

							"action": "I",

							"tableName": "segment",

							"keyColumn": "segmentid",

							"keyValue": "",

							"columnValueMap": [$scope.formData],
 
							"columnDataTypeMap": {

								"segmentid": "N",

								"workflowid": "N",

								"noofsplit": "N",

								"mutualflag": "S",

								"createdate": "D",

								"createuser": "S",

								"updatedate": "D",

								"updateuser": "S",

								"lastmodified": "T",

								"inputtype": "S",

								"segmentname": "S",

								"segementtype": "S",

								"segmentdescription": "S",

								"tablename": "S",

								"sourcecolumn": "S",

								"inputsourceid": "N",

								"persistflag": "S",

								"persisttable": "S"

							},

							"whereList": [],

							"moduleCode": "",

							"objectCode": "",

							"csrfToken": $rootScope.SessionTokenId,

							"childGetBean": $scope.finalSegmentCriteriaArray

						}

						//}
 
					}
 
					console.log(JSON.stringify(data));
					WebService
						.addData(url, data)
						.then(
							function(response) {
								var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
								var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
								var shortName = $scope.formData.segmentname;
								var longName = $scope.formData.segmentdescription;
								WorkflowService.updateConnectedDataWithProperties(
									$rootScope, diagramType,
									$scope.selectionId, $scope.clickedObjectId,
									externalId + '_' + response.keyValue,
									$scope.workflowId, $scope.metaDataId,
									shortName, longName);
								sourceDomId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].domId
									+ "_"
									+ $scope.selectionId
									+ "_"
									+ $scope.clickedObjectId + "_";

								if ($rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].outputObjectTypeObjectArray.length == 0) {
									WorkflowService.createObjectsAndConnect($rootScope,
										sourceDomId, 5,
										$rootScope.criteriaSplitDetails.length);
								}

								var idExternal = 209;
								var objectTypeId = 5;
								if ($rootScope.criteriaSplitDetails.length !== 0) {
									for (var i = 0; i < $rootScope.criteriaSplitDetails.length; i++) {

										for (var h = 0; h < $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray.length; h++) {
											if (parseInt($rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[h].domainId) === parseInt(idExternal
												+ "_"
												+ response.keyValue)) {
												for (var z = 0; z < $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[h].outputObjectTypeObjectArray.length; z++) {
													if (parseInt($rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[h].outputObjectTypeObjectArray[z].connectionLive) === parseInt(1)) {
														//var targetObjectTypeId = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[h].outputObjectTypeObjectArray[z].objectTypeId;
														var targetObjectId = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[h].outputObjectTypeObjectArray[z].objectId;
														if (($rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[targetObjectId].domainId === "" && parseInt($rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[targetObjectId].inputObjectTypeObjectArray[0].connectionLive) === parseInt(1))) {
															cellObjectId = targetObjectId;
															break;
														}

													}
												}

											}
										}
										var objectId = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].outputObjectTypeObjectArray[i].objectId
										var splitName = $rootScope.criteriaSplitDetails[i].splitname
										WorkflowService
											.updateConnectedDataWithProperties(
												$rootScope,
												diagramType,
												5,
												objectId,
												externalId
												+ "_"
												+ response.keyValue
												+ "_"
												+ i,
												$scope.workflowId,
												$rootScope.criteriaSplitDetails[i].cellid,
												splitName,
												splitName,
												splitName,
												splitName);
										// WorkflowService.updateConnectedDataWithProperties($rootScope,diagramType,
										// 6, i, idExternal + "_" +
										// response.keyValue + "_" + i,
										// $rootScope.attributesplitdetails[i].cellid,
										// $rootScope.attributesplitdetails[i].splitname);


									}
								}
								var instance = WorkflowService.InitiateJSplumb();
								WorkflowService.autoConnect(instance, $rootScope);
								//window.location.reload(true);				

								jAlert("Segment added successfully");
							})['catch'](function(reason) {
								$scope.error = reason;
								jAlert("Failed to add segment");
							});
				}				
				break;
			case 'selection':
				$scope.showPropertyData = true;
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/tactic/selection/addSelection.html';
				var domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;// "11";
				var splitSelectionIdWithIdExternal = domainId.split("_");
				$scope.currentId = splitSelectionIdWithIdExternal[1]
				if (!$scope.currentId) {
					$scope.action = 'add';
					$scope.formData = {
						'selectionid': '',
						'workflowid': $scope.workflowId,
						'createdate': '',
						'createuser': '',
						'updatedate': '',
						'updateuser': '',
						'lastmodified': '',

					};
				}
				else {
					$scope.action = 'edit';
					loadAggregationFunction();
					loadOperatorList();
					loadEditSelectionData($scope.currentId);
					loadselectionDetailsData($scope.currentId);
					loadEditAggregationDetails($scope.currentId);
				}
				$scope.operatorsList = [];
				$scope.aggregationFunction = [];
				$scope.status = {
					isOpen: [true]
				};
				$scope.columns = [];
				$rootScope.selectionData = [];
				$scope.switchFreeText = false;
				$scope.agr_columns = [];
				$scope.aggregate = {
					"agr_id": "",
					"selectionid": ""

				};
				$scope.criteria = { 'checked': false };
				$scope.switchtofreetext = { 'checked': false };
				$scope.sourceConfigList = [];
				$scope.sourcetargetAttributes = [];

				//$scope.workflowId = item.rowId.workflowId;
				$scope.selectionId = clickedObjectTypeId;
				$scope.clickedObjectId = clickedObjectId;

				loadAggregationFunction();
				loadOperatorList();
				//to  loadEdit Selection List
				function loadEditSelectionData(id) {
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "selectionid",
						"tableNameList": ["selection"],
						"filtersList": ["selectionid=" + id],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.formData = response[i].columnList;
							}
							//$scope.getTables($scope.formData.selectioninputtype);
						});
				}

				//to  loadEdit Selection Details List
				function loadselectionDetailsData(id) {
					var selDetailsData = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "selectionid",
						"tableNameList": ["selection_detail"],
						"filtersList": ["selectionid=" + id],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, selDetailsData)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$rootScope.selectionData.push(response[i].columnList);
							}

							if ($scope.formData.selectiontype == 'G' && $rootScope.selectionData != null) {
								$scope.criteria = { 'checked': true };
							} else if ($rootScope.selectionData.length == 0) {
								$scope.criteria = { 'checked': false };
							}

						});
				}

				/*to get Aggregation Details*/
				function loadEditAggregationDetails(id) {
					var selDetailsData = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "selectionid",
						"tableNameList": ["sel_aggregation"],
						"filtersList": ["selectionid=" + id],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, selDetailsData)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.aggregate = response[0].columnList;
								$scope.getAttributeList(response[0].columnList.agr_tablename);
							}

						});
				}

				/* to get switchFreeTextPage*/
				$scope.getswitchFreeTextPage = function(switchFreeText, tableName) {

					if (switchFreeText == true) {
						var templateUrl = CJApp.templatePath + '/workflow/selection/switchtofreetext.html';
						uiPopupFactory.open(templateUrl, "switchtofreetextController", "md",
							'static', 'Workflow', 'list', item, 'Add Switch To Free Text', tableName);
					}
				}

				/*Added function for push attributes*/
				$scope.pushAttributes = function(selectedCol) {
					if ($rootScope.selectionData.length == 0) {
						jAlert('Please select add before you pushing attribute.');
					}
					for (var i = 0; i < $rootScope.selectionData.length; i++) {
						if ($scope.selectedRowIndex == i) {
							if ($scope.selectedColumn == 'A') {
								$rootScope.selectionData[$scope.selectedRowIndex].sdcolumnname = selectedCol.columnname;
								$rootScope.selectionData[$scope.selectedRowIndex].sdcolumntype = selectedCol.datatype;
							} else if ($scope.selectedColumn == 'V') {
								$rootScope.selectionData[$scope.selectedRowIndex].sdvalue1 = selectedCol.columnname;
								$rootScope.selectionData[$scope.selectedRowIndex].sdcolumntype = selectedCol.datatype;
							}
						}
					}
					/*$scope.showProfile=false;
					var columnNames={
							"wsCode":"",
							"columnList":["*"],
							"keyColumn":"tsdid",
							"tableNameList":["sysdictionarycols"],
							"filtersList":["tablename='"+selectedCol.tablename+"'","columnname='"+selectedCol.columnname+"'"],
							"joinsList":[],
							"moduleCode":"",
							"objectCode":"",
							"csrfToken":$rootScope.SessionTokenId
							};
					var url="orchestrator/getData";
					WebService.addData(	url, columnNames)
							.then(function(response) {
							
									if(response[0].columnList.frequencyflag=='Y'){

										$scope.showProfile[index]=true;
										
									}else{
										$scope.showProfile[index]=false;
									}
							});*/

				}



				/*this for loading system attributes*/
				function loadSystemAttributes() {
					$scope.systemAttributeList = [];
					var arrtibuteData = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "systemattributeid",
						"tableNameList": ["systemattributes"],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					}

					var attibuteUrl = "orchestrator/getData";
					WebService.addData(attibuteUrl, arrtibuteData).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.systemAttributeList.push(response[i].columnList);
						}

					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure || "Something went wrong on loading operators");
					});

				}

				$scope.getColumns = function(column, index) {
					$scope.selectedRowIndex = index;
					$scope.selectedColumn = column;
				}


				$scope.getSelectType = function(type) {
					if (type == 'A') {
						$scope.criteria = { 'checked': false };
					}
				}


				$scope.getTables = function(inputtype) {
					if (inputtype == 'S') {
						loadTableAndSegmentData("persistid","persistentsegment",inputtype);
					}
					else if(inputtype =='T' && ($scope.tacticDetail.wfd_catlogueid==null || $scope.tacticDetail.wfd_catlogueid!=null)){
						loadTableAndSegmentData("tsdid","systemdictionary",inputtype);
					}
					else{
						/*loadTableCatalogue();*/
					}
     			}
     			function loadTableCatalogue(){
					$scope.tables = [];
					var url="orchestrator/getTablecatalogue/"+$scope.workflowId;
					WebService.GetData(url).then(function(response) {
								for(var i=0;i<response.length;i++){
									var tablenames={"tablename":response[i].columnList.tablename};
									$scope.tables.push(tablenames)
								}
							});
				 }
     
     			function loadTableAndSegmentData(key,table,type){
					$scope.tables = [];
					var tableObj = {};
					var url = "orchestrator/getData";
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": key,
						"tableNameList": [table],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};

					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								if (type == 'S') {
									tableObj = { "tablename": response[i].columnList.tablename }
								}
								else {
									tableObj = {
										"tablename": response[i].columnList.tablename,
										"inputsourceid": response[i].columnList.datasource
									};
								}
								console.log(i + "_" + $scope.formData.tablename)
								$scope.tables.push(tableObj)
							}

						});

				 }

				/*getting operators names*/
				function loadOperatorList() {
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "",
						"tableNameList": ["import_lookup_details"],
						"filtersList": ["dld_dlk_lookup_name='OPERATOR'"],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					}
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.operatorsList.push(response[i].columnList);
							}
						});
				}

				/* to get the Aggregation Function List*/
				function loadAggregationFunction() {
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "",
						"tableNameList": ["import_lookup_details"],
						"filtersList": ["dld_dlk_lookup_name='AGGREGATE_FUNCTION'"],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					}
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.aggregationFunction.push(response[i].columnList);
							}
						});
				}
				$scope.deleteColumn = function(idx) {
					//var index = $rootScope.selectionData.indexOf(col);
					$scope.selectionData.splice(idx, 1);

				}
				/* to add table Name to aggregation table when we  selected the criteria */
				$scope.addAggregateTableName = function(tableName) {

					$scope.aggregate.push({
						"agr_tablename": "'" + tableName + "'"
					});
				}
				$scope.updateChangeTable = function(tname) {
					if ($scope.formData.selectiontype == 'G') {
						$scope.aggregate.agr_tablename = tname;
					}
				}

				// to to get input sourceId
				$scope.getSourceId = function(tableName) {
					var url = "orchestrator/getData";
					var sourceColumns = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "tsdid",
						"tableNameList": ["systemdictionary"],
						"filtersList": ["tablename='" + tableName + "'"],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};

					WebService.addData(url, sourceColumns)
						.then(function(sourceIdresponse) {
							for (var i = 0; i < sourceIdresponse.length; i++) {
								$scope.formData.inputsourceid = sourceIdresponse[i].columnList.datasource;

							}

						});

				}

				$scope.getAttributeList = function(tableName) {
					$scope.columns = [];
					$scope.tableId = '';
					var columnNames = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "tsdid",
						"tableNameList": ["sysdictionarycols"],
						"filtersList": ["tablename='" + tableName + "'"],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, columnNames)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.columns.push(response[i].columnList);

							}
						});
				}

				/*Set active column*/
				$scope.setActiveColumn = function(col) {
					$scope.selectedRow = col;
				}
				/*Add empty expression*/
				$scope.addExpression = function(tablename) {
					loadSystemAttributes();
					var sortId = $rootScope.selectionData.length + 1;
					var selectioncolumn = {
						"selectiondetailsid": "",
						"selectionid": "",
						"sdtablename": tablename,
						"sdcolumnname": "",
						"sdcolumntype": "",
						"sdoperator": "",
						"sdvalue1": "",
						"sdvalue2": "",
						"sdexpression": "",
						"sdparent": "",
						"sdjoinkey": "",
						"sdtabletype": 'Val',
						"sdjoincondition": "",
						"lastmodified": "",
						"logicaloperator": "",
						"conditionaloperator": "",
						"sdopen": "",
						"sdclose": "",
						"sortid": sortId,

					}
					$rootScope.selectionData.push(selectioncolumn);
				}



				//to get profile Histogram	
				$scope.getProfileData = function(seldata, index) {
					WebService.GetData("getProfileTableCols/" + seldata.sdtablename + "/" + seldata.sdcolumnname).
						then(function(columnData) {
							$scope.profileTableCols = JSON.parse(columnData.profileTableCols);
						});
					$scope.labels = [];
					$scope.data = [];
					var histogramData = {};
					WebService.GetData("getHistogramData/" + seldata.sdtablename + '/' + seldata.sdcolumnname + '/' + '0' + '/' + '0').then(function(data) {

						$scope.chartDatas = JSON.parse(data.histogramData);
						$scope.histogramJsonData = JSON.parse($scope.chartDatas.histogramJsonData);
						console.log($scope.chartDatas.histogramDataList.length);
						var i, len;
						//for (i = 0,len=$scope.chartDatas.histogramDataList.length;i<20; i++) {
						for (i = 0; i < $scope.chartDatas.histogramDataList.length; i++) {
							$scope.labels.push($scope.chartDatas.histogramDataList[i].groupName);
							$scope.data.push($scope.chartDatas.histogramDataList[i].percentage);

						}

						histogramData = {
							"profileTableCols": $scope.profileTableCols,
							"tableColumnName": seldata.sdcolumnname,
							"histogramDataList": $scope.chartDatas.histogramDataList,
							"labels": $scope.labels,
							"data": $scope.data,
							"index": index
						}
						console.log(histogramData);
						var detailTemplateUrl = CJApp.templatePath + '/workflow/Profile/HistogramPopup.html';
						uiPopupFactory.open(detailTemplateUrl, "HistogramController", "lg", 'static', 'Import', 'list', 0, 'Map Columns', histogramData);
					});



				}





				/*Popup submit*/
				$scope.submit = function() {
					var url = "orchestrator/saveDetails"
					var data = {}

					if ($scope.formData.selectiontype == 'A') {
						data = {
							"wsCode": "",
							"action": $scope.currentId ? "U" : "I",
							"tableName": "selection",
							"keyColumn": "selectionid",
							"keyValue": $scope.currentId ? $scope.currentId : "",
							"columnValueMap": [$scope.formData],
							"columnDataTypeMap": {
								"selectionid": "N",
								"workflowid": "N",
								"createdate": "D",
								"createuser": "S",
								"updatedate": "D",
								"updateuser": "S",
								"lastmodified": "T",
								"selectioninputtype": "S",
								"tablename": "S",
								"selectiontype": "S",
								"selectiondescription": "S",
								"selectname": "S",
								"inputsourceid": "N"
							},
							"whereList": [],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": [],

						}
					} else if ($scope.formData.selectiontype == 'P') {

						data = {
							"wsCode": "",
							"action": $scope.currentId ? "U" : "I",
							"tableName": "selection",
							"keyColumn": "selectionid",
							"keyValue": $scope.currentId ? $scope.currentId : "",
							"columnValueMap": [$scope.formData],
							"columnDataTypeMap": {

								"selectionid": "N",
								"workflowid": "N",
								"createdate": "D",
								"createuser": "S",
								"updatedate": "D",
								"updateuser": "S",
								"lastmodified": "T",
								"selectioninputtype": "S",
								"tablename": "S",
								"selectiontype": "S",
								"selectiondescription": "S",
								"selectname": "S",
								"inputsourceid": "N"
							},
							"whereList": [

							],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": [{

								"wsCode": "",
								"action": "IU",
								"tableName": "selection_detail",
								"keyColumn": "selectiondetailsid",
								"keyValue": "",
								"columnValueMap": $rootScope.selectionData,
								"columnDataTypeMap": {
									"selectiondetailsid": "N",
									"selectionid": "N",
									"sdtablename": "S",
									"sdcolumnname": "S",
									"sdcolumntype": "S",
									"sdoperator": "S",
									"sdvalue1": "S",
									"sdvalue2": "S",
									"sdexpression": "S",
									"sdparent": "S",
									"sdjoinkey": "S",
									"sdtabletype": "S",
									"sdjoincondition": "S",
									"lastmodified": "T",
									"logicaloperator": "S",
									"conditionaloperator": "S",
									"sdopen": "S",
									"sdclose": "S",
									"sortid": "N",
								},
								"whereList": [

								],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							}
							],

						}
					} else if ($scope.formData.selectiontype == 'G') {

						data = {
							"wsCode": "",
							"action": $scope.currentId ? "U" : "I",
							"tableName": "selection",
							"keyColumn": "selectionid",
							"keyValue": $scope.currentId ? $scope.currentId : "",
							"columnValueMap": [$scope.formData],
							"columnDataTypeMap": {

								"selectionid": "N",
								"workflowid": "N",
								"createdate": "D",
								"createuser": "S",
								"updatedate": "D",
								"updateuser": "S",
								"lastmodified": "T",
								"selectioninputtype": "S",
								"tablename": "S",
								"selectiontype": "S",
								"selectiondescription": "S",
								"selectname": "S",
								"inputsourceid": "N"
							},
							"whereList": [

							],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId,
							"childGetBean": [{
								"wsCode": "",
								"action": "IU",
								"tableName": "sel_aggregation",
								"keyColumn": "agr_id",
								"keyValue": "",
								"columnValueMap": [$scope.aggregate],
								"columnDataTypeMap": {
									"agr_id": "N",
									"selectionid": "N",
									"agr_tablename": "S",
									"agr_function": "S",
									"agr_column": "S",
									"agr_operator": "S",
									"agr_value": "S"
								},
								"whereList": [

								],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							}
							],

						}

					}


					console.log(JSON.stringify(data));
					WebService.addData(url, data)
						.then(function(response) {
							if ($scope.criteria.checked) {
								updatecriteriaTable(response.keyValue);
							}
							var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
							var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
							var shortName = $scope.formData.selectname;
							var longName = $scope.formData.selectiondescription;
							$scope.sourceinputId = externalId + '_' + response.keyValue;
							//updateWorkflowMetaData(externalId+'_'+response.keyValue,response.keyValue);
							WorkflowService.updateConnectedDataWithProperties($rootScope, diagramType, $scope.selectionId, $scope.clickedObjectId, externalId + '_' + response.keyValue, $scope.workflowId, externalId + '_' + response.keyValue, shortName, longName);

							jAlert("Selection added successfully");
							//$uibModalInstance.close();	
						})['catch'](function(reason) {
							// This is set in the event of an error.
							$scope.error = reason;
							jAlert(reason.failure || "Something went wrong on adding selection properties");
						});

				}
				function updatecriteriaTable(id) {
					angular.forEach($rootScope.selectionData, function(val, key) {
						val.selectionid = id;
						if (val.sdcolumntype == '') {
							val.sdcolumntype = "S";
						}
					});
					console.log($rootScope.selectionData);
					var url = "orchestrator/saveDetails"
					var data = {
						"wsCode": "",
						"action": "I",
						"tableName": "selection_detail",
						"keyColumn": "selectiondetailsid",
						"keyValue": "",
						"columnValueMap": $rootScope.selectionData,
						"columnDataTypeMap": {
							"selectiondetailsid": "N",
							"selectionid": "N",
							"sdtablename": "S",
							"sdcolumnname": "S",
							"sdcolumntype": "S",
							"sdoperator": "S",
							"sdvalue1": "S",
							"sdvalue2": "S",
							"sdexpression": "S",
							"sdparent": "S",
							"sdjoinkey": "S",
							"sdtabletype": "S",
							"sdjoincondition": "S",
							"lastmodified": "T",
							"logicaloperator": "S",
							"conditionaloperator": "S",
							"sdopen": "S",
							"sdclose": "S",
							"sortid": "N",
						},
						"whereList": [

						],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId,
						"childGetBean": [],

					}
					WebService.addData(url, data)
						.then(function(response) {
							$uibModalInstance.close();
						})['catch'](function(reason) {
							// This is set in the event of an error.
							$scope.error = reason;
							jAlert(reason.failure || "Something went wrong on adding folder");
						});
				}

				//}
				break;
			case 'include':
				$scope.showPropertyData = true;
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/tactic/inclusion/addInclude.html';
				var domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;// "11";
				var splitSelectionIdWithIdExternal = domainId.split("_");
				$scope.currentId = splitSelectionIdWithIdExternal[1];

				if (!$scope.currentId) {
					$scope.formData = {
						"includeid": "",
						"workflowid": $scope.workflowId,
						"createdate": "",
						"createuser": "",
						"updatedate": "",
						"updateuser": "",
						"lastmodified": ""
					}
				}
				else {
					loadincludeData($scope.currentId);
				}
				$scope.selectionId = clickedObjectTypeId;
				$scope.clickedObjectId = clickedObjectId;
				$scope.sourceId = []
				$scope.sourceNames = [];
				$scope.cellnames = [];
				var connectedDataModel = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray.length;

				for (var i = 0; i < connectedDataModel; i++) {
					debugger
					var objectid = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].objectId
					var objectTypeId = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].objectTypeId
					var domainid = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId;
					if (parseInt($rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
						if (domainid !== "" || domainid !== " " || domainid !== null || domainid !== undefined) {
							$scope.sourceId.push($rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId);
							$scope.sourceNames.push({ 'id': $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId, 'sourceName': $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].shortName });
							$scope.cellnames.push($rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].shortName)
						}
					}
				}
				$scope.formData.sourceid = $scope.sourceId.toString();
				$scope.metaDataId = $scope.formData.sourceid;



				function loadincludeData(id) {
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "includeid",
						"tableNameList": ["include"],
						"filtersList": ["includeid=" + id],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};

					var url = "orchestrator/getData";
					WebService.addData(url, data).then(function(response) {
						angular.forEach(response, function(value, key) {
							$scope.formData = response[0].columnList;
						});

					});
				}
				/*submit functionality*/
				$scope.submit = function() {
					var url = "orchestrator/saveDetails"
					var data = {
						"wsCode": "",
						"action": $scope.currentId ? "U" : "I",
						"tableName": "include",
						"keyColumn": "includeid",
						"keyValue": $scope.currentId ? $scope.currentId : "",
						"columnValueMap": [$scope.formData],
						"columnDataTypeMap": {

							"includeid": "N",
							"workflowid": "N",
							"sourceid": "S",
							"createdate": "D",
							"createuser": "S",
							"updatedate": "D",
							"updateuser": "S",
							"lastmodified": "T",
							"includename": "S",
							"includemethod": "S",
							"includedescription": "S"
						},
						"whereList": [

						],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId,
						"childGetBean": [],

					}
					console.log(JSON.stringify(data));
					WebService.addData(url, data)
						.then(function(response) {
							if (!response.success && response.success == undefined) {

								var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
								var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
								var shortName = $scope.formData.includename;
								var longName = $scope.formData.includedescription;
								$scope.sourceinputId = externalId + '_' + response.keyValue;
								//updateWorkflowMetaData(externalId+'_'+response.keyValue,response.keyValue);
								WorkflowService.updateConnectedDataWithProperties($rootScope, diagramType, $scope.selectionId, $scope.clickedObjectId, externalId + '_' + response.keyValue, $scope.workflowId, $scope.metaDataId, shortName, longName);
								jAlert("Include added successfully");
							}
							else {
								jAlert("Failed to add include");
							}

						});
				}
				break;
			case 'exclude':
				$scope.showPropertyData = true;
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/tactic/exclusion/addExclude.html';
				var domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;// "11";
				var splitSelectionIdWithIdExternal = domainId.split("_");
				$scope.currentId = splitSelectionIdWithIdExternal[1];
				$scope.formData = {}
				if (!$scope.currentId) {
					$scope.formData = {
						"exclusionid": "",
						"workflowid": $scope.workflowId,
						"exclusionmethod": "M",
						"createdate": "",
						"createuser": "",
						"updatedate": "",
						"updateuser": "",
						"lastmodified": ""
					}
				}
				else {
					loadEditexclusionData($scope.currentId);
				}
				$scope.selectionId = clickedObjectTypeId;
				$scope.clickedObjectId = clickedObjectId;
				$scope.sourceId = []
				$scope.sourceNames = [];
				$scope.cellnames = []
				var connectedDataModel = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray.length;

				for (var i = 0; i < connectedDataModel; i++) {
					debugger
					var objectid = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].objectId
					var objectTypeId = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].objectTypeId
					var domainid = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId;
					if (parseInt($rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
						if (domainid !== "" || domainid !== " " || domainid !== null || domainid !== undefined) {
							$scope.sourceId.push($rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId);
							$scope.sourceNames.push({ 'id': $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId, 'sourceName': $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].shortName });
							$scope.cellnames.push({ 'id': $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId, 'sourceName': $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].shortName })
						}
					}
				}
				$scope.formData.sourceid = $scope.sourceId.toString();
				$scope.metaDataId = $scope.formData.sourceid;
				$scope.excludeSourceId = {};
				$scope.onSelectCell = function(id) {
					if ($scope.cellnames.length == Object.keys($scope.excludeSourceId).length) {
						jAlert("All options cannot be excluded");
						delete $scope.excludeSourceId[id];
					}
				}

				function loadEditexclusionData(id) {
					var excludeSourceId = [];
					//	var checkedid=[];
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "exclusionid",
						"tableNameList": ["exclusion"],
						"filtersList": ["exclusionid=" + id],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};

					var url = "orchestrator/getData";
					WebService.addData(url, data).then(function(response) {
						$scope.formData = response[0].columnList;
						//							checkedid =response[0].columnList.excludesourceid.split(",");
						excludeSourceId = response[0].columnList.sourceid.split(",");
						//							
						//							
						angular.forEach(excludeSourceId, function(soucevalue, sourcekey) {
							$scope.excludeSourceId[soucevalue] = true;
						});
						//									 
						//									
						//							    });

					});
				}
				$scope.submit = function() {
					var checkedValue = [];
					angular.forEach($scope.excludeSourceId, function(value, key) {
						if (value) {
							checkedValue.push(key);
						}
					});
					if (checkedValue.length == 0) {
						$scope.formData["excludesourceid"] = "";
					} else {
						$scope.formData["excludesourceid"] = checkedValue.toString();
					}

					var url = "orchestrator/saveDetails"
					var data = {
						"wsCode": "",
						"action": "I",
						"tableName": "exclusion",
						"keyColumn": "exclusionid",
						"keyValue": "",
						"columnValueMap": [$scope.formData],
						"columnDataTypeMap": {
							"exclusionid": "N",
							"workflowid": "N",
							"exclusionmethod": "S",
							"createdate": "D",
							"sourceid": "S",
							"excludesourceid": "S",
							"createuser": "S",
							"updatedate": "D",
							"updateuser": "S",
							"lastmodified": "T",
							"exclusionname": "S",
							"exclusiondescription": "S"
						},
						"whereList": [

						],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId,
						"childGetBean": [],

					}
					console.log(JSON.stringify(data));
					WebService.addData(url, data)
						.then(function(response) {
							if (!response.success && response.success == undefined) {
								debugger
								var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
								var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
								var shortName = $scope.formData.exclusionname;
								var longName = $scope.formData.exclusiondescription;
								$scope.sourceinputId = externalId + '_' + response.keyValue;
								//updateWorkflowMetaData(externalId+'_'+response.keyValue,response.keyValue);
								WorkflowService.updateConnectedDataWithProperties($rootScope, diagramType, $scope.selectionId, $scope.clickedObjectId, externalId + '_' + response.keyValue, $scope.workflowId, externalId + '_' + response.keyValue, shortName, longName);
								//	$uibModalInstance.close();	
								jAlert("Exclusion added successfully");
							}
							else {
								jAlert("Failed to add exclusion");
							}

						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert("Failed to add exclude properties");
						});
				}
				break;
			case 'alert':
				$scope.showPropertyData = true;
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/tactic/alertnotification/addAlertNotification.html';
				var domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;// "11";
				var splitSelectionIdWithIdExternal = domainId.split("_");
				$scope.currentId = splitSelectionIdWithIdExternal[1];
				$scope.formData = {};
				if (!$scope.currentId) {
					$scope.formData = {
						'alertnotificationid': '',
						'workflowid': $scope.workflowId,
						'alertphonenumber': '',
						'alertemails': '',
						'onsuccess': '',
						'onfailure': '',
						'sms_success_subject': '',
						'success_emailmessage': '',
						'sms_failure_subject': '',
						'failure_emailmessage': '',
						'alertdescription': '',
						'createdate': '',
						'createuser': '',
						'updatedate': '',
						'updateuser': '',
						'lastmodified': '',
						'email_success_subject': '',
						'email_failure_subject': ''

					}
				}
				else {

				}
				$scope.selectionId = clickedObjectTypeId;
				$scope.clickedObjectId = clickedObjectId;
				$scope.columns = [];
				$scope.cellnames = [];
				$rootScope.sourceNames = [];
				$scope.alertData = [];
				/*$scope.emailselectionData = [];
				$scope.bothsselectionData = [];*/
				$scope.alertdetails = [];
				$scope.userList = [];
				$scope.emailList = [];
				$scope.mobilenumberlist = [];

				var connectedDataModel = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray.length;

				for (var i = 0; i < connectedDataModel; i++) {
					var objectid = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].objectId
					var objectTypeId = $rootScope.connectedData.objectTypeArray[$scope.selectionId].objectArray[$scope.clickedObjectId].inputObjectTypeObjectArray[i].objectTypeId
					$rootScope.sourceId = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].metaDataId;
					$rootScope.sourceNames
						.push({
							'id': $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId,
							'sourceName': $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].shortName
						});
					var domainid = $rootScope.sourceId.split('_');
					//$scope.cellnames.push(domainid[1]);
				}

				loadGroupNames();
				/*for load groups list*/
				function loadGroupNames() {
					$scope.groupslist = [];
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "augagrcode",
						"tableNameList": ["adm_user_groups"],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.groupslist.push(response[i].columnList);
						}
					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure
							|| "Something went wrong on loading group list");
					});
				}
				$scope.loadrow = function(type, alertgroup) {
					getEmails(type, alertgroup)
					var length = $scope.alertData.length;
					if (length == 0) {
						$scope.alertData.push({
							'alertcontentid': '',
							'alertnotificationid': '',
							'workflowid': $scope.workflowId,
							'process_box_type': 'Default',
							'process_box_id': '',
							'sms_success': '',
							'sms_failure': '',
							'email_body_success': '',
							'email_body_failure': '',
							'email_success_subject': '',
							'email_failure_subject': '',
							'sortorder': length

						})
					}

				}
				function getEmails(alertType, alertgroup) {
					$scope.userList = [];
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "",
						"tableNameList": ["adm_user_groups"],
						"filtersList": ["augagrcode='" + alertgroup + "'"],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};


					var url = "orchestrator/getData";
					WebService.addData(url, data).then(function(response) {
						for (var i = 0; i < response.length; i++) {
							$scope.userList.push(response[i].columnList);

						}
						for (var j = 0; j < $scope.userList.length; j++) {
							getUserCommunicationDetails($scope.userList[j])
						}
					})['catch'](function(reason) {
						$scope.error = reason;
						jAlert(reason.failure || "Something went wrong on loading user emails");
					});
				}
				function getUserCommunicationDetails(userInfo) {
					var userListdata = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "aususername",
						"tableNameList": ["adm_users"],
						"filtersList": ["aususername=" + userInfo.augaususername + ""],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, userListdata)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								if ($scope.formData.alerttype == 'E') {
									$scope.emailList.push(response[i].columnList.ausemail);
								}
								else if ($scope.formData.alerttype == 'S') {
									$scope.mobilenumberlist.push(response[i].columnList.ausmobilenumber);
								}
								else if ($scope.formData.alerttype == 'B') {
									$scope.emailList.push(response[i].columnList.ausmobilenumber);
									$scope.mobilenumberlist.push(response[i].columnList.ausmobilenumber);
								}
							}

						})['catch'](function(reason) {
							$scope.error = reason;
							jAlert(reason.failure || "Something went wrong on loading user communication details");
						});
				}
				$scope.addAlertData = function(alertdetails) {

					var length = $scope.alertData.length;

					$scope.alertData.push({
						'alertcontentid': '',
						'alertnotificationid': '',
						'workflowid': $scope.workflowId,
						'process_box_type': '',
						'process_box_id': '',
						'sms_success': '',
						'sms_failure': '',
						'email_body_success': '',
						'email_body_failure': '',
						'email_success_subject': '',
						'email_failure_subject': '',
						'sortorder': length

					})

				}
				$scope.getBoxTypeId = function(alertType, index) {

					if (alertType == "Default") {
						alert("Default selected already");
						$scope.alertdetails.process_box_type = "";
						return
					}
					$scope.cellnames[index] = [];
					// var boxtypename = alertType;
					for (var i = 0; i < $rootScope.connectedData.objectTypeArray.length; i++) {
						if (alertType == $rootScope.connectedData.objectTypeArray[i].name) {
							for (var j = 0; j < $rootScope.connectedData.objectTypeArray[i].objectArray.length; j++) {
								if ($rootScope.connectedData.objectTypeArray[i].objectArray[j].objectLive == 1 &&
									$rootScope.connectedData.objectTypeArray[i].objectArray[j].domainId != '') {
									var splitboxid = $rootScope.connectedData.objectTypeArray[i].objectArray[j].domainId;
									var fields = splitboxid.split('_');
									$scope.cellnames[index].push(fields[1]);
								}
								else {
									jAlert('There is active properties set for this box')
								}
							}
						}
						/* for(var j=0;j<$rootScope.initializationData.objectTypeArray[i].objectArray.length;j++){
							 var splitboxid = $rootScope.initializationData.objectTypeArray[i].objectArray[j].domainId;	
							 if(splitboxid!=""){
								var fields = splitboxid.split('_');
								var SID = fields[1];
								$scope.cellnames[index].push(fields[1]); 
							 }
							 
						 }*/
					}


				}
				$scope.submit = function() {
					$scope.formData["alertphonenumber"] = $scope.emailList
						.toString();
					$scope.formData["alertemails"] = $scope.mobilenumberlist
						.toString();
					$scope.formData["sms_success_subject"] = $scope.alertData[0].sms_success;
					$scope.formData["success_emailmessage"] = $scope.alertData[0].email_body_success;
					$scope.formData["sms_failure_subject"] = $scope.alertData[0].sms_failure;
					$scope.formData["failure_emailmessage"] = $scope.alertData[0].email_body_failure;
					$scope.formData["email_success_subject"] = $scope.alertData[0].email_success_subject;
					$scope.formData["email_failure_subject"] = $scope.alertData[0].email_failure_subject;

					var data = {
						"wsCode": "",
						"action": "I",
						"tableName": "alertnotification",
						"keyColumn": "alertnotificationid",
						"keyValue": "",
						"columnValueMap": [$scope.formData],
						"columnDataTypeMap": {
							"alertnotificationid": "N",
							"alertnotificationname": "S",
							"alertgroup": "S",
							"alerttype": "S",
							"workflowid": "N",
							"alertphonenumber": "S",
							"alertemails": "S",
							"onsuccess": "S",
							"onfailure": "S",
							"sms_success_subject": "S",
							"success_emailmessage": "S",
							"sms_failure_subject": "S",
							"failure_emailmessage": "S",
							"alertdescription": "S",
							"createdate": "D",
							"createuser": "S",
							"updatedate": "D",
							"updateuser": "S",
							"lastmodified": "T",
							"email_success_subject": "S",
							"email_failure_subject": "S"
						},
						"whereList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId,
						"childGetBean": [{
							"wsCode": "",
							"action": "I",
							"tableName": "alertcontents",
							"keyColumn": "alertcontentid",
							"keyValue": "",
							"columnValueMap": $scope.alertData,
							"columnDataTypeMap": {
								"alertcontentid": "N",
								"alertnotificationid": "N",
								"workflowid": "N",
								"process_box_type": "S",
								"process_box_id": "S",
								"sms_success": "S",
								"sms_failure": "S",
								"email_body_success": "S",
								"email_body_failure": "S",
								"email_success_subject": "S",
								"email_failure_subject": "S",
								"sortorder": "N"

							},
							"whereList": [

							],
							"moduleCode": "",
							"objectCode": "",
							"csrfToken": $rootScope.SessionTokenId
						}]
					}
					console.log(JSON.stringify(data));
					var url = "orchestrator/saveDetails"
					WebService
						.addData(url, data)
						.then(
							function(response) {
								var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
								var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
								var shortName = $scope.formData.alertnotificationname;
								var longName = $scope.formData.alertdescription;
								WorkflowService.updateConnectedDataWithProperties(
									$rootScope, diagramType,
									$scope.selectionId, $scope.clickedObjectId,
									externalId + '_' + response.keyValue,
									$scope.workflowId, $rootScope.sourceId,
									shortName, longName);
								jAlert("Alert notification added successfully");
							})['catch'](function(reason) {
								$scope.error = reason;
								jAlert("Failed to add alert notification");
							});
				}
				break;
			case 'tactic':
				$scope.showPropertyData = true;
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/tactic/tactic/addTactic.html';
				var domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;// "11";
				var splitSelectionIdWithIdExternal = domainId.split("_");
				$scope.currentId = splitSelectionIdWithIdExternal[1];
				$scope.rewardsOneTime = true;
				$scope.formData = {};

				if (!$scope.currentId) {
					$scope.formData = {
						"lt_wfl_id": $scope.workflowId,
						"lt_id": "",
						"createdate": "",
						"createuser": "",
						"updatedate": "",
						"updateuser": "",
						"lastmodified": ""
					}
				}
				else {
					loadEditTacticData()
				}
				$scope.rewardsStartegyStatus = {
					isOpen: [true]
				};
				/*$scope.$watch('formData.posteventflag', function(newVal, oldVal) {
					if (newVal !== oldVal) {
						$scope.loadData();
					}
				});*/
				$scope.selectionId = clickedObjectTypeId;
				$scope.clickedObjectId = clickedObjectId;
				$scope.selectedRewardStrategiesData = [];
				loadStrategiesLists();
				loadRewardStrategyFolder();
				loadpartnerList();
				loadposteventList();

				//loadData();
				//to  loadstrategiesList
				function loadStrategiesLists() {
					$scope.strategiesLists = []
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "clr_id",
						"tableNameList": ["loy_calculation_rule"],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.strategiesLists.push(response[i].columnList);
							}
						});
				}
				function loadRewardStrategyFolder() {
					var rfolderList = [];
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "",
						"tableNameList": ["orc_folder"],
						"filtersList": ["fld_folder_type=" + 'RewardStrategy'],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								rfolderList.push(response[i].columnList);
							}
							$scope.rewardStrategyFolder = $filter('orderBy')(rfolderList, "fld_create_date");
						})
					['catch'](function(reason) {
						// This is set in the event of an error.
						$scope.error = reason;
						jAlert(reason.failure);
					});
				}

				function loadpartnerList() {
					$scope.partnerList = [];
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "org_id",
						"tableNameList": ["loy_partner_organizations"],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.partnerList.push(response[i].columnList);
							}

						});
				}
				function loadposteventList() {
					$scope.posteventList = [];
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "postevent_id",
						"tableNameList": ["loy_postevent_update"],
						"filtersList": ["postevent_status=" + 'Active'],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.posteventList.push(response[i].columnList);
							}

						});
				}

				/*load edit data of tactic*/
				function loadEditTacticData() {
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "lt_id",
						"tableNameList": ["loy_tactics"],
						"filtersList": ["lt_id=" + $scope.currentId],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.formData = response[i].columnList;
							}
							loadTacticRewardStrategies()
						});
				}
				function loadTacticRewardStrategies() {
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "ltd_id",
						"tableNameList": ["loy_tactic_details"],
						"filtersList": ["lt_id=" + $scope.currentId],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.selectedRewardStrategiesData.push(response[i].columnList);
							}
						});
				}
				/*Set active column*/
				$scope.setActiveColumn = function(col) {
					$scope.selectedRow = col;
				}
				$scope.addStrategy = function() {
					var ctgdetailsColumn = {

						"ltd_id": "",
						"lt_id": $scope.currentId ? $scope.currentId : "",
						"ltd_lrs_id": $scope.selectedRow.clr_id,
						"ltd_coolperiod": "",
						"ltd_offercount": "",
						"createdate": "",
						"createuser": "",
						"updatedate": "",
						"updateuser": "",
						"lastmodified": ""
					}
					$scope.selectedRewardStrategiesData.push(ctgdetailsColumn);
				}
				$scope.submit = function() {
					$scope.formData.lt_cool_period = 0;
					var url = "orchestrator/saveDetails"
					var data = {
						"wsCode": "",
						"action": $scope.currentId ? "U" : "I",
						"tableName": "loy_tactics",
						"keyColumn": "lt_id",
						"keyValue": $scope.currentId ? $scope.currentId : "",
						"columnValueMap": [$scope.formData],
						"columnDataTypeMap": {
							"lt_id": "N",
							"lt_wfl_id": "N",
							"lt_cool_period": "N",
							"lt_orgid": "N",
							"lt_prgid": "N",
							"lt_name": "S",
							"lt_status": "S",
							"lt_type": "S",
							"allowofferflag": "S",
							"createdate": "D",
							"createuser": "S",
							"updatedate": "D",
							"updateuser": "S",
							"lastmodified": "T",
							"notificationeventflag": "S",
							"posteventflag": "S",
							"transcationbasedflag": "S",
							"postevent_id": "N"
						},
						"whereList": [
						],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId,
						"childGetBean": [
							{
								"wsCode": "",
								"action": $scope.currentId ? "IU" : "I",
								"tableName": "loy_tactic_details",
								"keyColumn": "ltd_id",
								"keyValue": "",
								"columnValueMap": $scope.selectedRewardStrategiesData,
								"columnDataTypeMap": {
									"ltd_id": "N",
									"lt_id": "N",
									"ltd_lrs_id": "N",
									"createdate": "D",
									"createuser": "S",
									"updatedate": "D",
									"updateuser": "S",
									"lastmodified": "T",
									"ltd_coolperiod": "N",
									"ltd_offercount": "N"
								},
								"whereList": [
								],
								"moduleCode": "",
								"objectCode": "",
								"csrfToken": $rootScope.SessionTokenId
							}
						]
					}

					console.log(JSON.stringify(data));
					WebService.addData(url, data)
						.then(function(response) {
							if (!response.success && response.success == undefined) {
								var externalId = $rootScope.initializationData.objectTypeArray[$scope.selectionId].idExternal;
								var diagramType = $rootScope.initializationData.objectTypeArray[$scope.selectionId].diagramType;
								var shortName = $scope.formData.lt_name;
								var longName = $scope.formData.lt_name;
								$scope.sourceinputId = externalId + '_' + response.keyValue;
								WorkflowService.updateConnectedDataWithProperties($rootScope, diagramType, $scope.selectionId,
									$scope.clickedObjectId, externalId + '_' + response.keyValue, $scope.workflowId, externalId + '_' + response.keyValue, shortName, longName);
								jAlert("Tactic added successfully");
							}
							else {
								alert("Failed to add tactic ");
							}
						});
				}




				$scope.deleteColumnRow = function(col) {
					var index = $scope.selectionEventData.indexOf(col);
					$scope.selectionEventData.splice(index, 1);
				}
				break;
			case 'referral':
				//$scope.showPropertyData=true;
				$scope.templateUrl = CJApp.templatePath
					+ '/programs/referral/referral/addReferral.html';
				var domainId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].domainId;// "11";
				var splitSelectionIdWithIdExternal = domainId.split("_");
				$scope.currentId = splitSelectionIdWithIdExternal[1];
				if ($scope.currentId) {
					loadReferralEditdata();
				}
				var connectedDataModel = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray.length;

				for (var i = 0; i < connectedDataModel; i++) {
					var objectid = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].objectId
					var objectTypeId = $rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].objectTypeId
					if (parseInt(objectTypeId) !== 9 && parseInt(objectTypeId) !== 5) {

						var domainid = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId
						// $rootScope.sourceId =$rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].metaDataId;
						if (domainid === "" || domainid === " " || domainid === null || domainid === undefined) {
							if (parseInt($rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
								var information = "A referral process box should have atleast one inputs with its properties set.";
								jAlert(information);
								$scope.showPropertyData = false;
								return false;
							}
						}
						else {
							$scope.showPropertyData = true;
						}
					} else {
						var domainid = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].domainId;
						//$rootScope.sourceId =$rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[objectid].metaDataId;
						if (domainid === "" || domainid === " " || domainid === null || domainid === undefined) {
							if (parseInt($rootScope.connectedData.objectTypeArray[clickedObjectTypeId].objectArray[clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
								var information = "A referral box should have atleast one inputs with its properties set.";
								jAlert(information);
								$scope.showPropertyData = false;
								return false;
							}
						}
						else {
							$scope.showPropertyData = true;
						}
					}
				}
				
				$scope.showSelect = false;
				$scope.inputNumber = null;
				$scope.selectedOption = '';
				$scope.checkInput = function() {
					var inputValue = parseInt($scope.formData.rf_referer_rewardlimit);
					if (!isNaN(inputValue)) {
						$scope.showSelect = true;
					} else {
						$scope.showSelect = false;
					}
				};
				$scope.formData = {};
				$scope.strategiesList = [];
				loadStrategiesList();

				//to  loadstrategiesList
				function loadStrategiesList() {
					var data = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "lrs_id",
						"tableNameList": ["loy_reward_strategies"],
						"filtersList": [],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, data)
						.then(function(response) {
							for (var i = 0; i < response.length; i++) {
								$scope.strategiesList.push(response[i].columnList);
							}

						});
				}

				function loadReferralEditdata() {
					var row = {
						"wsCode": "",
						"columnList": ["*"],
						"keyColumn": "rf_id",
						"tableNameList": ["referral"],
						"filtersList": ["rf_id=" + $scope.currentId],
						"joinsList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId
					};
					var url = "orchestrator/getData";
					WebService.addData(url, row)
						.then(function(response) {
							$scope.formData = response[0].columnList;
						});
				}

				$scope.submit = function() {
					var url = "orchestrator/saveDetails"
					var data =
					{
						"wsCode": "",
						"action": $scope.currentId ? "IU" : "I",
						"tableName": "referral",
						"keyColumn": "rf_id",
						"keyValue": "",
						"columnValueMap": [$scope.formData],
						"columnDataTypeMap": {
							"rf_id": "N",
							"rf_name": "S",
							"rf_description": "S",
							"rf_referer": "N",
							"rf_referee": "N",
							"rf_limit_type": "S",
							"rf_limit_value": "S",
							"rf_measure_flag": "S",
							"createdate": "D",
							"createuser": "S",
							"updatedate": "D",
							"updateuser": "S",
							"lastmodified": "T",
							"rf_wfl_id": "N",
							"rf_referer_rewardlimit": "N",
							"rf_prgid": "N"

						},
						"whereList": [],
						"moduleCode": "",
						"objectCode": "",
						"csrfToken": $rootScope.SessionTokenId,
						"childGetBean": []
					}

					console.log(JSON.stringify(data));
					WebService.addData(url, data)
						.then(function(response) {
							if (!response.success && response.success == undefined) {
								//$uibModalInstance.close();					
								var externalId = $rootScope.initializationData.objectTypeArray[clickedObjectTypeId].idExternal;
								var diagramType = $rootScope.initializationData.objectTypeArray[clickedObjectTypeId].diagramType;
								var shortName = $scope.formData.rf_name;
								var longName = $scope.formData.rf_name;
								$scope.sourceinputId = externalId + '_' + response.keyValue;
								WorkflowService.updateConnectedDataWithProperties($rootScope, diagramType, clickedObjectTypeId,
									clickedObjectId, externalId + '_' + response.keyValue, $scope.workflowId, externalId + '_' + response.keyValue, shortName, longName);

								jAlert("Referral add/edited successfully");
							}
							else {
								alert("Failed to add/edit referral ");
							}

						});
				}



				break;
			default:
				break;
		}
	}

	$rootScope.deleteModel = function(object, that) {

		var currentConnectedData = $rootScope.connectedData;
		if (currentConnectedData.objectTypeArray[object.clickedObjectTypeId].objectArray[object.clickedObjectId].inputObjectTypeObjectArray !== undefined) {
			for (var i = 0; i < currentConnectedData.objectTypeArray[object.clickedObjectTypeId].objectArray[object.clickedObjectId].inputObjectTypeObjectArray.length; i++) {
				if (parseInt(currentConnectedData.objectTypeArray[object.clickedObjectTypeId].objectArray[object.clickedObjectId].inputObjectTypeObjectArray[i].connectionLive) === 1) {
					jAlert("Please remove all connections before deleting the box", "Alert Dialog");
					return false;

				}
			}
		}

		var formData = {
			"domainId": object.clickedDomainId
		};

		if (object.clickedDomainId.split("_")[0] == 159) {
			checkStatusOfWorkflowWithScheduler(object.clickedDomainId, object.clickedObjectTypeId, object.clickedObjectId);
		} else {

			$scope.clickObjectId = object.clickedDomainId;

			removeObjectsFromScreen(object.clickedObjectTypeId, object.clickedObjectId);

			cleanAllDeadObjects();

		}

	}
	function cleanAllDeadObjects() {

		var connectedData = $rootScope.connectedData;
		for (var i = 0; i < connectedData.objectTypeArray.length; i++) {
			for (var j = connectedData.objectTypeArray[i].objectArray.length - parseInt(1); j >= 0; j--) {
				if (parseInt(connectedData.objectTypeArray[i].objectArray[j].objectLive) === 0) {
					//removing the objectArray index with objectLive = 0
					connectedData.objectTypeArray[i].objectArray.splice(j, 1);
				}

			}
		}
	}

	function removeObjectsFromScreen(objectTypeId, objectId) {
		var connectedData = $rootScope.connectedData;
		var initializationData = $rootScope.initializationData;
		var creatNewInstance = jsPlumb.getInstance();

		var objectDomId = initializationData.objectTypeArray[objectTypeId].domId + "_" + objectTypeId + "_" + objectId + "_";


		var target_box_splitName = objectDomId.split("_");
		var target_domainId = null;
		if (objectId > $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray.length) {
			for (var i = 0; i < $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray.length; i++) {
				if ($rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[i].id == objectId) {
					target_domainId = $rootScope.connectedData.objectTypeArray[objectTypeId].objectArray[i].domainId;
					break;
				}
			}
		} else {
			target_domainId = connectedData.objectTypeArray[objectTypeId].objectArray[objectId].domainId;
		}
		var flag = true;

		if (flag == true) {

			creatNewInstance.removeAllEndpoints(objectDomId);
			$("#" + objectDomId).remove();
			connectedData.objectTypeArray[objectTypeId].objectArray[objectId].objectLive = 0;
			connectedData.objectTypeArray[objectTypeId].objectArray[objectId].executionStatus = 'deleted';
			connectedData.objectTypeArray[objectTypeId].objectDroppedCount--;
			WorkflowService.updateWorkFlow($rootScope.orchestratorId, $rootScope.connectedData);
			deleteWorkflowObjectById($scope.clickObjectId, initializationData.diagramType, connectedData.streamid);
			window.location.reload(true);
		}

	}
	function deleteWorkflowObjectById(objectId, diagramType, streamid) {
		var splitDomaidId = objectId.split("_");
		var url;

		switch (splitDomaidId[0]) {

			case '161': {

				url = streamcepUrl + "/cep/deleteBucketStream/" + streamid + "/" + splitDomaidId[1];
			}
				break;

			case '162': {
				url = streamcepUrl + "/cep/deleteBucketRule/" + streamid + "/" + splitDomaidId[1];

			}
				break;
			case '178': {
				url = streamcepUrl + "/cep/deleteTriggerStream/" + streamid + "/" + splitDomaidId[1];

			}
				break;
			case '179': {
				url = streamcepUrl + "/cep/deleteTriggerBucket/" + streamid + "/" + splitDomaidId[1];

			}
				break;
			default:
				break;
		}

		WebService.GetData(url).then(function(response) {

			if (response.respMessage === "success") {
				jAlert("Deleted successfully");
				window.location.reload = true;
			}

		});

	}

	/**
	 *
	 * To do:
	 * - tab/shift tab: (un)indent a line on command
	 * - 'mass tab': select several lines and (un)indent them all (requires TAB)
	 * - support for undo/redo, by using `execCommand('insertText')`
	 */

	function doAutoIndent(ta, indent) {
		indent || (indent = "\t");

		function setValue(text) {
			ta.value = text;
			return ta.value;
		}

		function str_repeat(str, n) {
			var out = '';
			while (n--) out += str;
			return out;
		}

		function isIndented(line) {
			var regex = new RegExp('^(' + indent + '+)', 'g'),
				match = line.match(regex);
			return match && match[0].length / indent.length || 0;
		}

		function addIndent(before, after, num) {
			// num = num ? ~~num : 1;
			if (!num) return;
			ta._lastValue = setValue(before + str_repeat(indent, num) + after);
			ta.selectionStart = ta.selectionEnd = before.length + indent.length * num;
		}

		function removeIndent(before, after) {
			var remove = before.slice(before.length - 1 - indent.length, before.length - 1);
			if (remove != indent) {
				return;
			}

			ta._lastValue = setValue(before.slice(0, -1 - indent.length) + '}' + after);
			ta.selectionStart = ta.selectionEnd = before.length - indent.length;
		}

		function getPrevLine(before) {
			var lines = ta.value.split(/\n/g),
				line = before.trimRight().split(/\n/g).length - 1;
			return lines[line] || '';
		}

		function onKeyUp(e) {
			var lastValue = ta._lastValue === undefined ? ta.defaultValue : ta._lastValue,
				change = ta.value.length - lastValue.length;
			ta._lastValue = ta.value;
			if (!change) {
				return;
			}

			var caret = ta.selectionStart,
				added = change > 0 && ta.value.substr(caret - change, change) || '',
				removed = change < 0 && lastValue.substr(caret, -change) || '';

			var code = e.keyCode;
			var value = ta.value,
				before = value.substr(0, caret),
				after = value.substr(caret),
				lastChar = before.trim().slice(-1),
				nextChar = after.substr(0, 1);

			// ENTER
			if (code == 13) {
				// Immediately after a {
				if (lastChar == '{') {
					var prevLine = getPrevLine(before),
						indents = isIndented(prevLine),
						more = nextChar == '}' ? 0 : 1;
					return addIndent(before, after, indents + more);
				}

				// After an indented line
				var prevLine = getPrevLine(before),
					indents = isIndented(prevLine),
					more = nextChar == '}' ? -1 : 0;
				if (indents + more > 0) {
					addIndent(before, after, indents + more);
				}
			}
			else if (added == '}') {
				removeIndent(before, after);
			}
		}

		ta.addEventListener('keyup', onKeyUp, false);
	}

    $rootScope.$on("updateProgramStatus", function() {
		 updateProgramStatusOnCancel();
	});
	
	function updateProgramStatusOnCancel(){
		if ($rootScope.cancelFlag) {
	        $scope.programFormData.prg_status = "I";  
	    }

	    // Check the status of the program and show appropriate message
	    if ($scope.programFormData.prg_status == "I") {
	        $scope.programFormData.prg_status = "I";
	        if (!$rootScope.cancelFlag){
				jAlert("Program deactivated successfully");
			}
	        
	    } else {
	        $scope.programFormData.prg_status = "A";
	        jAlert("Program activated successfully");
	    }
	}

    $scope.programFormData = $scope.programFormData || {};

	$scope.activateProgram = function() {
        var templateUrl = CJApp.templatePath + '/programs/activateProgram.view.html';
         var title = $scope.programFormData.prg_status === 'A' ?
        "Program Activation Checklist" :
        "Program Deactivation Checklist";
		uiPopupFactory.open(templateUrl, "activateProgramController", "add", "md", 'static', '', 'list', title, $scope.programFormData);
     }
    
	$scope.activateProgramWorkflow = function() {
		var url = "http://192.168.0.39:8088/executeAccumalation";
		var data = {
			"lapId": "59"
		}
		WebService.addData(url, data).then(function(response) {
			alert('chk');

		})['catch'](function(reason) {
			$scope.error = reason;
			jAlert("Failed to  activate program workflow");
		});
	}
	
	
	
		/*delete tier upgrades/downgrades/retention */
	 		$scope.deleteTierReward=function(idx,type){
	 			var id;
	 			if(type=='upgrade'){
	 				id=$scope.upGradeTierRewards[idx].lsr_id;
	 			}
	 			else if(type=='downgrade'){
	 				id=$scope.downGradeTierRewards[idx].lsr_id;
	 			}
	 			else{
	 				id=$scope.retentionTierRewards[idx].lsr_id;
	 			}
	 			//var id =$scope.approvers[idx].approvalid;
	 			if(id!=""){
	 				jConfirm('Are you sure want to delete this tier reward?', 'Confirmation Dialog', function(r) {
	 		           if(r){
	 		           	$scope.loading=true;
	 		   			var url='orchestrator/deleteRowId';
	 		   			var data=
	 		   			 {
	 		   				 "keyValue":id,	
	 		   				 "tableName":"loy_service_reward_strategy",
	 		   				 "columnheader":"lsr_id"
	 		   			 }
	 		   			WebService.addData(url, data).then(function(response) {				
	 		   				if(response.message.trim()=="success"){
	 		   					jAlert('Data deleted successfully');
	 		   						 		   					
	 		   					$scope.loading=false;
	 		   					
	 		   					if(type=='upgrade'){
	 					$scope.getUpgradeTierRewards();
	 				}
	 				else if(type=='downgrade'){
	 					
	 					$scope.getDowngradeTierRewards();
	 				}else if(type=='retention'){
						$scope.getRetentionTierRewards(); 
					 }
	 		   					
	 		   					
	 		   				}
	 		   				else{
	 		   					$scope.loading=false;
	 		   					jAlert('Failed to delete data')
	 		   					
	 		   				}
	 		   			})['catch'](function(reason) {
	 		   				$scope.loading=false;
	 		   				jAlert(reason.failure || 'Failed to delete data');
	 		   			})	
	 		           }
	 		       });
	 			}
	 			else{
	 				if(type=='upgrade'){
	 					$scope.upGradeTierRewards.splice(idx, 1);
	 				}
	 				else if(type=='downgrade'){
	 					$scope.downGradeTierRewards.splice(idx, 1);
	 				}
	 				else{
	 					$scope.retentionTierRewards.splice(idx, 1);
	 				}
	 			}
	 		}

	
	
}

