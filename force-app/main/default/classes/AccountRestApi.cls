@RestResource(urlMapping='/restapi/*')
global with sharing class AccountRestApi {

    global class AccountData {
        public String Name;
        public String Address;
        public Integer NumOfEmployees;
    }

    global class AccountRequest {
        public AccountData data;
        public String action;
    }

    /*
     * Response class used only for account creation.
     * It contains no generic Object property.
     */
    global class InsertResponse {
        public Boolean success;
        public String message;
        public Id recordId;

        public InsertResponse(
            Boolean success,
            String message,
            Id recordId
        ) {
            this.success = success;
            this.message = message;
            this.recordId = recordId;
        }
    }

    /*
     * Strongly typed response for retrieving accounts.
     */
    global class GetAccountsResponse {
        public Boolean success;
        public String message;
        public Integer count;
        public List<Account> data;

        public GetAccountsResponse(
            Boolean success,
            String message,
            List<Account> data
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
            this.count = data == null ? 0 : data.size();
        }
    }

    @HttpPost
    global static void processRequest() {
        setJsonContentType();

        try {
            String requestBody =
                RestContext.request.requestBody == null
                ? null
                : RestContext.request.requestBody.toString();

            if (String.isBlank(requestBody)) {
                writeResponse(
                    400,
                    new InsertResponse(
                        false,
                        'Request body is required.',
                        null
                    )
                );
                return;
            }

            AccountRequest payload =
                (AccountRequest) JSON.deserialize(
                    requestBody,
                    AccountRequest.class
                );

            if (payload == null || payload.data == null) {
                writeResponse(
                    400,
                    new InsertResponse(
                        false,
                        'The data property is required.',
                        null
                    )
                );
                return;
            }

            if (
                String.isBlank(payload.action) ||
                payload.action.toLowerCase() != 'insert'
            ) {
                writeResponse(
                    400,
                    new InsertResponse(
                        false,
                        'Unsupported action. Only insert is supported.',
                        null
                    )
                );
                return;
            }

            if (String.isBlank(payload.data.Name)) {
                writeResponse(
                    400,
                    new InsertResponse(
                        false,
                        'Account Name is required.',
                        null
                    )
                );
                return;
            }

            Account accountRecord = new Account(
                Name = payload.data.Name,
                BillingCity = payload.data.Address,
                NumberOfEmployees = payload.data.NumOfEmployees
            );

            insert accountRecord;

            writeResponse(
                201,
                new InsertResponse(
                    true,
                    'Account created successfully.',
                    accountRecord.Id
                )
            );

        } catch (System.JSONException exceptionValue) {
            writeResponse(
                400,
                new InsertResponse(
                    false,
                    'Invalid JSON request: ' +
                        exceptionValue.getMessage(),
                    null
                )
            );

        } catch (DmlException exceptionValue) {
            writeResponse(
                400,
                new InsertResponse(
                    false,
                    'Account could not be created: ' +
                        exceptionValue.getDmlMessage(0),
                    null
                )
            );

        } catch (Exception exceptionValue) {
            writeResponse(
                500,
                new InsertResponse(
                    false,
                    'Unexpected server error.',
                    null
                )
            );
        }
    }

    @HttpGet
    global static void getAccounts() {
        setJsonContentType();

        try {
            List<Account> accounts = [
                SELECT
                    Id,
                    Name,
                    AccountNumber,
                    Phone,
                    Website,
                    Industry,
                    BillingCity,
                    BillingCountry,
                    NumberOfEmployees,
                    AnnualRevenue,
                    CreatedDate
                FROM Account
                WITH USER_MODE
                ORDER BY CreatedDate DESC
                LIMIT 100
            ];

            writeResponse(
                200,
                new GetAccountsResponse(
                    true,
                    'Accounts fetched successfully.',
                    accounts
                )
            );

        } catch (Exception exceptionValue) {
            Map<String, Object> errorResponse =
                new Map<String, Object>{
                    'success' => false,
                    'message' => 'Accounts could not be fetched.',
                    'count' => 0,
                    'data' => new List<Account>()
                };

            writeResponse(500, errorResponse);
        }
    }

    private static void setJsonContentType() {
        RestContext.response.addHeader(
            'Content-Type',
            'application/json; charset=UTF-8'
        );
    }

    private static void writeResponse(
        Integer statusCode,
        Object responsePayload
    ) {
        RestContext.response.statusCode = statusCode;
        RestContext.response.responseBody = Blob.valueOf(
            JSON.serialize(responsePayload)
        );
    }
}