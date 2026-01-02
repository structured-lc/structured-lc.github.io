### Leetcode 3764 (Hard): Most Common Course Pairs [Practice](https://leetcode.com/problems/most-common-course-pairs)

### Description  
Given a list of students' course completion sequences, where each student has taken a sequence of courses (integers representing course IDs), identify all consecutive course pairs (Course A → Course B) across all students. Return the frequency of each unique pair, sorted by frequency in descending order, and for ties, by the lexicographically smallest pair (A, B).

### Examples  

**Example 1:**  
Input: `pairs = [[1,2,3],[2,3],[3]]`  
Output: `[[2,3,2],[1,2,1]]`  
*Explanation: Pairs are (1→2), (2→3) from first; (2→3) from second; none from third. (2,3) appears 2 times, (1,2) appears 1 time.*

**Example 2:**  
Input: `pairs = [[1,3],[2,3],[3,1]]`  
Output: `[[3,1,1],[1,3,1],[2,3,1]]`  
*Explanation: Pairs are (1→3), (2→3), (3→1). All appear once, sorted lexicographically.*

**Example 3:**  
Input: `pairs = []`  
Output: `[]`  
*Explanation: No students or sequences, so no pairs.*


### Thought Process (as if you’re the interviewee)  
First, brute-force: For each student's sequence, generate all consecutive pairs (i, i+1), count them using nested loops → O(total courses across all students).  
To optimize, use a hashmap (dict of tuples) to count pair frequencies in one pass: iterate each sequence, add (seq[i], seq[i+1]) → O(N) where N is total courses.  
Then, collect all (pair, freq) where freq > 0, sort by -freq (descending), then by pair, pair[1] (lex smallest). This is efficient as sorting is O(P log P) where P ≤ N/2 is small. Chosen for O(N) time, simple, handles large inputs well vs brute O(N²).

### Corner cases to consider  
- Empty input: pairs = [] or empty sequences → return [].  
- Single-course sequences: e.g., [[1]] → no pairs.  
- All identical pairs: e.g., multiple students with same sequence → high freq for those pairs.  
- Large course IDs: Use tuples as keys (hashable), assume 0 ≤ course ID ≤ 10⁹.  
- Ties in frequency: Sort lexicographically by (A, B).  
- Single student with long sequence vs many short ones.

### Solution

```python
from collections import defaultdict
from typing import List

def mostCommonCoursePairs(pairs: List[List[int]]) -> List[List[int]]:
    # Step 1: Count frequency of each consecutive pair (A, B) using hashmap
    freq = defaultdict(int)
    for seq in pairs:
        # For each sequence, generate consecutive pairs
        for i in range(len(seq) - 1):
            pair = (seq[i], seq[i + 1])
            freq[pair] += 1
    
    # Step 2: Collect non-zero freq pairs as list of [A, B, count]
    result = []
    for pair, count in freq.items():
        if count > 0:  # Always true, but explicit
            result.append([pair[0], pair[1], count])
    
    # Step 3: Sort by descending frequency, then lex smallest (A, B)
    # Sort key: first -count (desc), then A asc, then B asc
    result.sort(key=lambda x: (-x[2], x[0], x[1]))
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + P log P), where N is total courses across all sequences (for counting), P ≤ N/2 is number of unique pairs (for sorting). Sorting dominates but P is small.
- **Space Complexity:** O(P) for hashmap storing unique pairs + O(P) for result list. No recursion.


### Potential follow-up questions (as if you’re the interviewer)  

- If we need top K most common pairs only?  
  *Hint: Use heap/priority queue on (freq, A, B) or sort and slice[:K].*

- What if pairs are undirected (A→B same as B→A)?  
  *Hint: Normalize tuples by sorting A,B inside before hashing.*

- Handle streaming input: update frequencies incrementally for new students?  
  *Hint: Reuse same defaultdict, just append new sequences to processing.*

### Summary
Count consecutive course pairs using a hashmap on tuples, then sort by descending frequency and lexicographical order. Common pattern: frequency counting + sorting for top-k or ranking problems, applicable to session analysis, sequence mining, or transition graphs.

### Flashcard
Count consecutive pairs from sequences using tuple hashmap for O(1) freq updates, then sort by -frequency and lex order to get most common transitions.

### Tags

### Similar Problems
