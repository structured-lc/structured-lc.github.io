### Leetcode 2611 (Medium): Mice and Cheese [Practice](https://leetcode.com/problems/mice-and-cheese)

### Description  
You are given two arrays, **reward1** and **reward2**, where reward1[i] is the reward if the 1ˢᵗ mouse eats the iᵗʰ cheese, and reward2[i] is the reward if the 2ⁿᵈ mouse eats the iᵗʰ cheese. There are exactly **n** cheeses and *each cheese must be eaten by exactly one mouse*. You are also given an integer **k**: the **first mouse must eat exactly k cheeses**, and the second mouse eats the rest. Choose the cheeses so that the **sum of rewards is maximized**.

### Examples  

**Example 1:**  
Input: `reward1 = [1,1,3,4], reward2 = [4,4,1,1], k = 2`  
Output: `15`  
*Explanation: The first mouse eats cheeses at indices 2 and 3 (rewards: 3, 4). The second mouse eats cheeses at indices 0 and 1 (rewards: 4, 4). Total reward: 3+4+4+4=15, which is the maximum possible.*

**Example 2:**  
Input: `reward1 = [1,300,2,4], reward2 = [2,1,2,4], k = 1`  
Output: `307`  
*Explanation: The first mouse eats cheese at index 1 (reward: 300). The second mouse eats indices 0, 2, and 3 (rewards: 2, 2, 4). Total reward: 300+2+2+4=308 (Optimal: check assumptions during solution, since [most sources use only example 1, but this fits the rules]).*

**Example 3:**  
Input: `reward1 = [3,5,7], reward2 = [7,5,1], k = 2`  
Output: `19`  
*Explanation: The first mouse should eat indices 1 and 2 (rewards: 5 and 7), and the second mouse eats index 0 (reward: 7). Total: 5+7+7=19.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**: Try every way to pick **k** cheeses for the 1ˢᵗ mouse (all ⎛n,k⎞ possibilities), assign the rest to the 2ⁿᵈ mouse, and sum the rewards. But this is infeasible for large n.
- **Optimize**:  
  - Notice: For each cheese, assigning it to mouse 1 gives reward1[i], to mouse 2 gives reward2[i].
  - The **difference** (reward1[i] - reward2[i]) tells you how much better (positive/negative) it is if mouse 1 eats i versus mouse 2.
  - The goal: Pick the k cheeses with the **largest (reward1[i] - reward2[i])** for mouse 1, let mouse 2 eat the others.
- **Steps**:
  1. Assume mouse 2 eats all cheeses: sum = sum(reward2).
  2. For the k cheeses where switching to mouse 1 most increases the sum (i.e., largest differences), instead give to mouse 1 and add their difference to the sum.
  3. **Greedy approach**: Sort differences, take the k largest.
- **Trade-off**: This is O(n log n) for sorting, O(n) otherwise; significantly better than brute-force.

### Corner cases to consider  
- k = 0 or k = n (all cheeses eaten by one mouse).
- reward1[i] == reward2[i] for all i (no difference in assignment, but still must respect k).
- reward1 and reward2 have negative values.
- Very large k or n (algorithm must be efficient).
- Duplicate or all-equal rewards.

### Solution

```python
def miceAndCheese(reward1, reward2, k):
    n = len(reward1)
    # Compute differences and keep original indices for clarity (not strictly needed)
    diffs = [(reward1[i] - reward2[i], i) for i in range(n)]
    
    # Sort by difference descending (most beneficial for mouse 1 to take)
    diffs.sort(reverse=True)
    
    # Start with all cheeses eaten by mouse 2
    total = sum(reward2)
    
    # Let mouse 1 take the k most beneficial cheeses
    for j in range(k):
        diff, idx = diffs[j]
        # Mouse 1 replaces mouse 2 for this cheese: add diff to total
        total += diff
        
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting the n differences. All other steps are O(n).
- **Space Complexity:** O(n) for storing the difference array and possibly the indices. No extra recursion stack or large structures.

### Potential follow-up questions (as if you’re the interviewer)  

- If both mice could eat k cheeses each (so some cheeses must be ignored), how would you extend your approach?  
  *Hint: Consider subset selection and possibly dynamic programming for 2*k cheeses out of n.*

- Suppose k is very small (much less than n), is there a faster way than sorting for large n?  
  *Hint: Use a min-heap to keep top k differences in O(n log k) time.*

- If reward arrays contain negative values, does your algorithm still work?  
  *Hint: Analyze how negative rewards can affect the choice, but greedy logic still holds.*

### Summary
This problem is a classic **greedy assignment** and top-K selection pattern: maximize a sum by optimally partitioning items by largest difference in gain/loss between two options. This is common in resource assignment, portfolio maximization, and team distribution problems. Tools: sorting by value difference, or heap for the top-k.