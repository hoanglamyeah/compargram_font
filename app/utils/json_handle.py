import json


def is_json(myjson):
    try:
        if myjson is None or myjson == '':
            return False
        else:
            json_object = json.loads(myjson)
    except ValueError, e:
        return False
    return True

