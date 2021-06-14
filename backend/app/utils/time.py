from datetime import datetime
def duration(time) :
    now = datetime.now()
    duration = now - time.replace(tzinfo=None)
    if duration.seconds < 60 :
        return str(duration.seconds) +' seconds'
    elif duration.seconds < 3600 :
        return str(divmod(duration.seconds, 60)[0]) + ' minutes'
    elif duration.seconds < 86400 :
        return str(divmod(duration.seconds, 3600)[0]) + ' hours'
    elif duration.seconds < 31536000 :
        return str(divmod(duration.seconds, 60)[0])    + ' days'
    else :
        return str(divmod(duration.seconds, 31536000)[0])  + 'year'
