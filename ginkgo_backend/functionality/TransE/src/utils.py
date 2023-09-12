# utils.py

import csv
import random

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
                self.entity2id[row[0].strip()] = int(row[1].strip())
                
        self.id2entity = {v: k for k, v in self.entity2id.items()}
        
        with open(self.relation_file) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                self.relation2id[row[0].strip()] = int(row[1].strip())
                
        self.id2relation = {v: k for k, v in self.relation2id.items()}
        

    def get_entity_id(self, entity_name):
        return self.entity2id.get(entity_name.strip(), -1)
    
    def get_entity_name(self, entity_id):
        print(entity_id)
        return self.id2entity.get(entity_id, 'UNKNOWN')

    def get_relation_id(self, relation_name):
        return self.relation2id.get(relation_name.strip(), -1)
    
    def get_relation_name(self, relation_id):
        print(relation_id)
        return self.id2relation.get(relation_id, 'UNKNOWN')
    
    def get_random_links_with_head(self, entity_name, num_links=9, random_seed=123456789):
        """
        Retrieve random links whose head is the specified entity.

        Args:
            entity_name (str): The name of the entity you want as the head.
            num_links (int): The number of random links to retrieve (default is 9).

        Returns:
            list of tuple: List of random links whose head is the specified entity.
        """
        random.seed(random_seed)