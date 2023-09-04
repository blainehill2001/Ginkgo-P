# utils.py

import csv

class EntityRelationMapper:

    def __init__(self, entity_file, relation_file):
        
        self.entity2id = {}
        self.relation2id = {}
        
        self.id2entity = {}
        self.id2relation = {}
        
        self.entity_file = entity_file
        self.relation_file = relation_file
        
        self.load_mappings()
        

    def load_mappings(self):
            
        with open(self.entity_file) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                self.entity2id[row[0]] = int(row[1])
                
        self.id2entity = {v: k for k, v in self.entity2id.items()}
        
        with open(self.relation_file) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                self.relation2id[row[0]] = int(row[1])
                
        self.id2relation = {v: k for k, v in self.relation2id.items()}
        

    def get_entity_id(self, entity_name):
        return self.entity2id.get(entity_name, -1)
    
    def get_entity_name(self, entity_id):
        return self.id2entity.get(entity_id, 'UNKNOWN')

    def get_relation_id(self, relation_name):
        return self.relation2id.get(relation_name, -1)
    
    def get_relation_name(self, relation_id):
        return self.id2relation.get(relation_id, 'UNKNOWN')