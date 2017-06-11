# -*- coding: utf-8 -*-
"""
Created on Sat Jun 10 12:45:05 2017

@author: Karolis
"""
import urllib2, json, threading  # the lib that handles the url stuff

def printit():
    threading.Timer(300.0, printit).start()
    username = 'Parcel Condition'
    password = 'iot101'
    url = 'https://www.emcom.eu/api/v1/device/3975'
    print("calling %s with %s:%s\n" % (url, username, password))

    passman = urllib2.HTTPPasswordMgrWithDefaultRealm()
    passman.add_password(None, url, username, password)
    urllib2.install_opener(urllib2.build_opener(urllib2.HTTPBasicAuthHandler(passman)))

    req = urllib2.Request(url)
    f = urllib2.urlopen(req)
    data = f.read()
    d = json.loads(data)
    print d
    with open('data.json', 'w') as f:
        json.dump(d, f, indent=4)

printit()
