### Leetcode 506 (Easy): Relative Ranks [Practice](https://leetcode.com/problems/relative-ranks)

### Description  
Given an array of unique integer scores where scores[i] represents the score of the iᵗʰ athlete, your task is to assign ranks based on scores.  
- The highest score gets "Gold Medal", the second highest gets "Silver Medal", and the third gets "Bronze Medal".
- All others get their numeric rank as a string (e.g., "4", "5", etc., corresponding to their place).
- Return an array result such that result[i] is the rank of the iᵗʰ athlete.

### Examples  

**Example 1:**  
Input: `score = [5, 4, 3, 2, 1]`  
Output: `["Gold Medal","Silver Medal","Bronze Medal","4","5"]`  
*Explanation: The ranks are assigned in descending order of scores. 5 is first, 4 is second, 3 is third, then 2 and 1 are fourth and fifth.*

**Example 2:**  
Input: `score = [10,3,8,9,4]`  
Output: `["Gold Medal","5","Bronze Medal","Silver Medal","4"]`  
*Explanation:  
- 10 is the top score → "Gold Medal"  
- 9 is second → "Silver Medal"  
- 8 is third → "Bronze Medal"  
- 4 is fourth → "4"  
- 3 is fifth → "5".  
Output order aligns with athlete indices.*

**Example 3:**  
Input: `score = [50,30,80,70,10]`  
Output: `["Bronze Medal","4","Gold Medal","Silver Medal","5"]`  
*Explanation:   
- 80 (index 2) is first → "Gold Medal"  
- 70 (index 3) is second → "Silver Medal"  
- 50 (index 0) is third → "Bronze Medal"  
- 30 (index 1) is fourth → "4"  
- 10 (index 4) is fifth → "5".*

### Thought Process (as if you’re the interviewee)  

First, to determine the rank efficiently, I need to know each athlete’s original index and their score. If I sort the athletes by their scores in descending order, I can assign "Gold Medal", "Silver Medal", and "Bronze Medal" to the top three. For the rest, their rank is simply their sorted order + 1 (as a string).

Brute-force would involve finding the max repeatedly or searching for the ranks for each athlete, resulting in higher overall complexity.  
Instead, I opt to:
- Store each athlete’s index and score.
- Sort by score descending.
- Assign rank in order, mapping back to each athlete's original index.

This reduces the complexity and aligns results to the required order.

### Corner cases to consider  
- Only 1 athlete: should get "Gold Medal".
- 2 or 3 athletes: only assign available medals; no numerical ranks.
- Very large input size.
- Scores are all unique; no need to handle ties.
- No negative or zero scores (constraint: all are valid integers and unique).

### Solution

```python
def findRelativeRanks(score):
    # Pair each score with its original index
    n = len(score)
    indexed_scores = [(s, i) for i, s in enumerate(score)]
    
    # Sort by score descending
    indexed_scores.sort(reverse=True)
    
    # Prepare result list
    result = [''] * n
    
    # Assign medals/ranks
    for rank, (s, i) in enumerate(indexed_scores):
        if rank == 0:
            result[i] = "Gold Medal"
        elif rank == 1:
            result[i] = "Silver Medal"
        elif rank == 2:
            result[i] = "Bronze Medal"
        else:
            result[i] = str(rank + 1)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  (Sorting n elements takes O(n log n); everything else is O(n))
- **Space Complexity:** O(n)  
  (Extra storage for the list of index-score tuples and the output array)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where scores are not unique?  
  *Hint: How do you define ranking for ties?*

- Can you do it faster than O(n log n)?  
  *Hint: Think about the value limits and possible use of counting sort.*

- What if you needed to return the ranking for any particular athlete in O(1) time?  
  *Hint: Precompute a hash map from athlete to rank.*

### Summary  
This approach uses the **sorting + ranking pattern**, often used when mapping elements to their relative positions. By sorting a list of (score, index) pairs and mapping ranks back to original indices, you efficiently solve a broad class of ranking problems. This technique is common in leaderboards, grading systems, and contest rankings.

### Tags
Array(#array), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
