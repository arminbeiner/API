export function errorHandlingResponse(response, result, err, log) {
    if(err) {
        response.json(err)
        log.error('Error during Database Request',  err.stack, err.message)
    }
    else {
        response.json(result.rows)
        log.info('Successfully executed Database Request')
    }
}