#!/bin/bash

cat /etc/shells > shells.txt

awk -F "/" '{ if($2 == "usr") print $NF;}' shells.txt