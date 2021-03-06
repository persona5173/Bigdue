#!/usr/bin/env python3

import sys
import csv


class Node_vis(object):
    def __init__(self):
        self.data = list()

    def feed(self, data: object) -> object:
        self.data.append(data)

    def export_csv(self):
        data_process = {}
        # removeDup = list(set(self.data))
        with open('Node.csv', 'w') as csvfile:
            writer = csv.writer(csvfile, quoting = csv.QUOTE_MINIMAL)
            writer.writerow(['node', 'weight'])
            # writer.writerow([removeDup])
            # for read_data in removeDup:
            #     writer.writerow([read_data])
            for read_data in self.data:
                try:
                    data_process[read_data] += 1
                except:
                    data_process[read_data] = 1

            for key, value in data_process.items():
                writer.writerow([key,value])
                # writer.writerow([key, value])

    def print_removeDup(self):
        print(list(set(self.data)))