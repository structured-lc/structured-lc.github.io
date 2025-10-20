### Leetcode 433 (Medium): Minimum Genetic Mutation [Practice](https://leetcode.com/problems/minimum-genetic-mutation)

### Description  
A gene string can be represented by an 8-character long string, with choices from 'A', 'C', 'G', and 'T'.

Suppose we need to investigate a mutation from a gene string `startGene` to a gene string `endGene` where one mutation is defined as one single character changed in the gene string.

- For example, "AACCGGTT" → "AACCGGTA" is one mutation.

There is also a gene bank that records all the valid gene mutations. A gene must be in bank to be a valid gene string. Given the two gene strings `startGene` and `endGene` and the gene bank, return the minimum number of mutations needed to mutate from `startGene` to `endGene`. If there is no such a mutation, return -1.

Note that the starting point is assumed to be valid, so it might not be included in the bank.

### Examples  

**Example 1:**  
Input: `startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]`  
Output: `1`  
*Explanation: One mutation from "AACCGGTT" to "AACCGGTA".*

**Example 2:**  
Input: `startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]`  
Output: `2`  
*Explanation: "AACCGGTT" → "AACCGGTA" → "AAACGGTA"*

**Example 3:**  
Input: `startGene = "AAAAACCC", endGene = "AACCCCCC", bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]`  
Output: `3`  

### Thought Process (as if you're the interviewee)  
This is a shortest path problem in an unweighted graph where:
- Each valid gene string is a node
- Two nodes are connected if they differ by exactly one character
- We need to find the shortest path from startGene to endGene

Approaches:
1. **BFS**: Since we want minimum mutations, BFS guarantees shortest path
2. **Bidirectional BFS**: Search from both ends to reduce search space
3. **DFS with memoization**: Less optimal but possible

BFS is the most suitable since we need the minimum number of steps in an unweighted graph.

### Corner cases to consider  
- endGene not in bank (impossible mutation)
- startGene equals endGene (0 mutations)
- Empty bank
- No valid path exists
- Bank contains startGene
- Single character difference between start and end

### Solution

```python
from collections import deque

def minMutation(startGene, endGene, bank):
    # If endGene is not in bank, mutation is impossible
    if endGene not in bank:
        return -1
    
    # If start equals end, no mutation needed
    if startGene == endGene:
        return 0
    
    # Convert bank to set for O(1) lookup
    bank_set = set(bank)
    visited = set()
    queue = deque([(startGene, 0)])  # (current_gene, mutations)
    visited.add(startGene)
    
    # Possible characters for mutation
    genes = ['A', 'C', 'G', 'T']
    
    while queue:
        current_gene, mutations = queue.popleft()
        
        # Try mutating each position
        for i in range(len(current_gene)):
            # Try each possible character at position i
            for gene in genes:
                if gene == current_gene[i]:  # Skip same character
                    continue
                
                # Create new gene by mutation
                new_gene = current_gene[:i] + gene + current_gene[i+1:]
                
                # Check if we reached the target
                if new_gene == endGene:
                    return mutations + 1
                
                # If valid mutation and not visited, add to queue
                if new_gene in bank_set and new_gene not in visited:
                    visited.add(new_gene)
                    queue.append((new_gene, mutations + 1))
    
    return -1  # No valid mutation path found

# Bidirectional BFS for optimization
def minMutationBidirectional(startGene, endGene, bank):
    if endGene not in bank:
        return -1
    
    if startGene == endGene:
        return 0
    
    bank_set = set(bank)
    genes = ['A', 'C', 'G', 'T']
    
    # Two sets for bidirectional search
    forward = {startGene}
    backward = {endGene}
    visited = set()
    mutations = 0
    
    while forward and backward:
        # Always search from the smaller set
        if len(forward) > len(backward):
            forward, backward = backward, forward
        
        mutations += 1
        next_forward = set()
        
        for gene in forward:
            for i in range(len(gene)):
                for char in genes:
                    if char == gene[i]:
                        continue
                    
                    new_gene = gene[:i] + char + gene[i+1:]
                    
                    # Check if we meet the other search
                    if new_gene in backward:
                        return mutations
                    
                    # Add to next level if valid and not visited
                    if new_gene in bank_set and new_gene not in visited:
                        visited.add(new_gene)
                        next_forward.add(new_gene)
        
        forward = next_forward
    
    return -1

# DFS approach with memoization (less efficient)
def minMutationDFS(startGene, endGene, bank):
    if endGene not in bank:
        return -1
    
    bank_set = set(bank)
    genes = ['A', 'C', 'G', 'T']
    memo = {}
    
    def dfs(current, target, visited):
        if current == target:
            return 0
        
        if current in memo:
            return memo[current]
        
        min_mutations = float('inf')
        
        for i in range(len(current)):
            for gene in genes:
                if gene == current[i]:
                    continue
                
                new_gene = current[:i] + gene + current[i+1:]
                
                if new_gene in bank_set and new_gene not in visited:
                    visited.add(new_gene)
                    mutations = dfs(new_gene, target, visited)
                    if mutations != -1:
                        min_mutations = min(min_mutations, mutations + 1)
                    visited.remove(new_gene)
        
        result = min_mutations if min_mutations != float('inf') else -1
        memo[current] = result
        return result
    
    return dfs(startGene, endGene, {startGene})

# Helper function to check if two genes differ by exactly one character
def isOneCharDiff(gene1, gene2):
    if len(gene1) != len(gene2):
        return False
    
    diff_count = 0
    for i in range(len(gene1)):
        if gene1[i] != gene2[i]:
            diff_count += 1
            if diff_count > 1:
                return False
    
    return diff_count == 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × M × 4 × M) where N = size of bank, M = length of gene string (8). For each gene, we try 4 mutations at M positions.
- **Space Complexity:** O(N) for the queue, visited set, and bank set.

### Potential follow-up questions (as if you're the interviewer)  

- How would you optimize if the gene strings were much longer?  
  *Hint: Use more efficient string manipulation or preprocessing to build adjacency relationships.*

- What if we wanted to find all possible shortest mutation paths?  
  *Hint: Modify BFS to track all parent relationships and reconstruct paths.*

- How would you handle the case where multiple mutations can happen simultaneously?  
  *Hint: This would change the problem to allow Hamming distance > 1, requiring different graph construction.*

- Can you solve this if we needed to minimize the cost where different mutations have different costs?  
  *Hint: Use Dijkstra's algorithm instead of BFS for weighted shortest path.*

### Summary
This problem is a classic application of BFS for finding shortest paths in unweighted graphs. The key insights are recognizing it as a graph problem where valid gene strings are nodes connected by single-character mutations, and using BFS to guarantee the minimum number of mutations. The solution demonstrates how string manipulation problems can often be transformed into graph traversal problems, and showcases the power of BFS for shortest path problems in unweighted scenarios.


### Flashcard
Find shortest mutation path with BFS on gene graph—nodes differ by one char, edges connect valid mutations.

### Tags
Hash Table(#hash-table), String(#string), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Word Ladder(word-ladder) (Hard)