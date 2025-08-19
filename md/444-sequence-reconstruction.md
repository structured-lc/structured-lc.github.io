### Leetcode 444 (Medium): Sequence Reconstruction [Practice](https://leetcode.com/problems/sequence-reconstruction)

### Description  
You are given an integer array nums of length n where nums is a permutation of integers in the range [1, n]. You are also given a 2D integer array sequences where sequences[i] is a subsequence of nums.

Check if nums is the shortest supersequence of sequences. A supersequence is a sequence that contains all sequences as subsequences.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3], sequences = [[1,2],[1,3]]`  
Output: `false`  
*Explanation: There are two possible supersequences: [1,2,3] and [1,3,2]. The sequence [1,2,3] is not the only shortest supersequence, so return false.*

**Example 2:**  
Input: `nums = [1,2,3], sequences = [[1,2]]`  
Output: `false`  
*Explanation: The shortest supersequence is [1,2]. nums is not the shortest supersequence.*

**Example 3:**  
Input: `nums = [1,2,3], sequences = [[1,2],[1,3],[2,3]]`  
Output: `true`  
*Explanation: The shortest supersequence is [1,2,3]. nums is the shortest supersequence.*

### Thought Process (as if you're the interviewee)  
This problem is about checking if a given sequence is uniquely determined by its subsequences. The key insights:

1. **Topological ordering**: The sequences define partial order relationships
2. **Unique reconstruction**: We need to check if there's exactly one valid topological ordering
3. **Coverage**: Every adjacent pair in nums must be supported by some sequence

Approaches:
1. **Topological sort**: Build graph from sequences and check if topological sort is unique
2. **Direct validation**: Check if every consecutive pair in nums appears in some sequence
3. **Reconstruction simulation**: Try to reconstruct nums using only the given sequences

The topological sort approach provides the most insight into the problem structure.

### Corner cases to consider  
- Empty sequences
- Single element nums
- Sequences that don't cover all elements
- Multiple valid topological orderings
- Sequences with gaps
- Overlapping sequences

### Solution

```python
def sequenceReconstruction(nums, sequences):
    from collections import defaultdict, deque
    
    # Build adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in_degree for all numbers
    for num in nums:
        in_degree[num] = 0
    
    # Build graph from sequences
    for seq in sequences:
        for i in range(len(seq) - 1):
            curr, next_num = seq[i], seq[i + 1]
            
            # Check if numbers are valid
            if curr not in in_degree or next_num not in in_degree:
                return False
            
            graph[curr].append(next_num)
            in_degree[next_num] += 1
    
    # Topological sort using Kahn's algorithm
    queue = deque([num for num in nums if in_degree[num] == 0])
    result = []
    
    while queue:
        # If more than one element has in-degree 0, ordering is not unique
        if len(queue) > 1:
            return False
        
        current = queue.popleft()
        result.append(current)
        
        # Reduce in-degree of neighbors
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # Check if reconstruction matches nums
    return result == nums

# Alternative approach: direct validation
def sequenceReconstructionDirect(nums, sequences):
    # Check if every consecutive pair in nums is covered by sequences
    required_pairs = set()
    for i in range(len(nums) - 1):
        required_pairs.add((nums[i], nums[i + 1]))
    
    # Collect all pairs from sequences
    available_pairs = set()
    all_numbers = set()
    
    for seq in sequences:
        for num in seq:
            all_numbers.add(num)
        
        for i in range(len(seq) - 1):
            available_pairs.add((seq[i], seq[i + 1]))
    
    # Check if all numbers in nums are covered
    if all_numbers != set(nums):
        return False
    
    # Check if all required pairs are available
    return required_pairs.issubset(available_pairs)

# More thorough validation approach
def sequenceReconstructionThorough(nums, sequences):
    n = len(nums)
    
    # Check if sequences contain all numbers from nums
    all_seq_numbers = set()
    for seq in sequences:
        all_seq_numbers.update(seq)
    
    if all_seq_numbers != set(nums):
        return False
    
    # Build graph and check unique topological ordering
    from collections import defaultdict, deque
    
    graph = defaultdict(set)  # Use set to avoid duplicate edges
    in_degree = {num: 0 for num in nums}
    
    for seq in sequences:
        for i in range(len(seq) - 1):
            curr, next_num = seq[i], seq[i + 1]
            
            if next_num not in graph[curr]:
                graph[curr].add(next_num)
                in_degree[next_num] += 1
    
    # Kahn's algorithm for topological sort
    queue = deque([num for num in nums if in_degree[num] == 0])
    topo_order = []
    
    while queue:
        # Must have exactly one choice at each step for unique ordering
        if len(queue) != 1:
            return False
        
        current = queue.popleft()
        topo_order.append(current)
        
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    return topo_order == nums

# Simplified approach focusing on coverage
def sequenceReconstructionSimple(nums, sequences):
    # Create position mapping for nums
    pos = {nums[i]: i for i in range(len(nums))}
    
    # Track which consecutive pairs are covered
    pairs_covered = [False] * (len(nums) - 1)
    
    for seq in sequences:
        for i in range(len(seq)):
            # Check if number is valid
            if seq[i] not in pos:
                return False
            
            # Check consecutive pairs
            if i > 0:
                prev_pos = pos[seq[i - 1]]
                curr_pos = pos[seq[i]]
                
                # They must be consecutive in nums
                if curr_pos == prev_pos + 1:
                    pairs_covered[prev_pos] = True
                elif curr_pos <= prev_pos:
                    # Invalid ordering
                    return False
    
    # All consecutive pairs must be covered
    return all(pairs_covered)

# DFS-based approach
def sequenceReconstructionDFS(nums, sequences):
    from collections import defaultdict
    
    # Build adjacency list
    graph = defaultdict(list)
    all_numbers = set()
    
    for seq in sequences:
        all_numbers.update(seq)
        for i in range(len(seq) - 1):
            graph[seq[i]].append(seq[i + 1])
    
    # Check if all numbers are present
    if all_numbers != set(nums):
        return False
    
    # Try to reconstruct using DFS
    def dfs(current_path, remaining):
        if not remaining:
            return current_path == nums
        
        # Find next possible numbers
        candidates = set()
        if current_path:
            last = current_path[-1]
            candidates.update(graph[last])
        else:
            # Starting nodes (no incoming edges from sequences)
            for num in remaining:
                has_incoming = False
                for seq in sequences:
                    if num in seq and seq.index(num) > 0:
                        has_incoming = True
                        break
                if not has_incoming:
                    candidates.add(num)
        
        candidates &= remaining
        
        # Must have exactly one choice for unique reconstruction
        if len(candidates) != 1:
            return False
        
        next_num = candidates.pop()
        return dfs(current_path + [next_num], remaining - {next_num})
    
    return dfs([], set(nums))

# Clean implementation with edge case handling
def sequenceReconstructionClean(nums, sequences):
    if not nums:
        return not sequences or all(not seq for seq in sequences)
    
    from collections import defaultdict, deque
    
    n = len(nums)
    
    # Build graph from sequences
    graph = defaultdict(list)
    in_degree = {num: 0 for num in nums}
    
    for seq in sequences:
        # Validate sequence numbers
        for num in seq:
            if num not in in_degree:
                return False
        
        # Add edges
        for i in range(len(seq) - 1):
            graph[seq[i]].append(seq[i + 1])
            in_degree[seq[i + 1]] += 1
    
    # Topological sort with uniqueness check
    queue = deque([num for num in nums if in_degree[num] == 0])
    result = []
    
    while queue:
        if len(queue) > 1:
            return False  # Not unique
        
        current = queue.popleft()
        result.append(current)
        
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    return len(result) == n and result == nums
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(V + E) where V is the number of unique elements and E is the total number of pairs in all sequences. This is for building the graph and performing topological sort.
- **Space Complexity:** O(V + E) for storing the graph, in-degree counts, and other data structures.

### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this to find the shortest supersequence when nums is not given?  
  *Hint: Use topological sort to find any valid ordering, but you'd need to handle cases where multiple orderings exist.*

- What if sequences could contain duplicate numbers?  
  *Hint: Modify the graph construction to handle duplicates properly, possibly by treating positions rather than just values.*

- How would you solve this if you needed to find all possible shortest supersequences?  
  *Hint: Use backtracking or generate all valid topological orderings that satisfy the sequence constraints.*

- Can you optimize this for the case where sequences are very long but nums is short?  
  *Hint: Focus on just the relevant transitions needed to validate nums rather than processing all sequence pairs.*

### Summary
This problem combines topological sorting with uniqueness checking to verify sequence reconstruction. The key insight is that a unique reconstruction exists if and only if the topological ordering of the dependency graph is unique. This pattern appears in scheduling problems, dependency resolution, and sequence analysis. Understanding how to build dependency graphs from partial information and check for unique orderings is fundamental in many algorithmic applications involving precedence constraints and ordering requirements.

### Tags
Array(#array), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
- Course Schedule II(course-schedule-ii) (Medium)