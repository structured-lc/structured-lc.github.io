### Leetcode 2600 (Easy): K Items With the Maximum Sum [Practice](https://leetcode.com/problems/k-items-with-the-maximum-sum)

### Description  
You are given a bag containing items labeled with 1, 0, or -1.  
The bag has:
- numOnes items labeled 1,
- numZeros items labeled 0,
- numNegOnes items labeled -1.

Given k, pick exactly k items to maximize the sum of their values.  
What is the **maximum possible sum** you can achieve by choosing exactly k items?

### Examples  

**Example 1:**  
Input: `numOnes = 3, numZeros = 2, numNegOnes = 0, k = 2`  
Output: `2`  
*Explanation: The bag is [1, 1, 1, 0, 0]. Pick two 1’s for a sum of 2.*

**Example 2:**  
Input: `numOnes = 3, numZeros = 2, numNegOnes = 0, k = 4`  
Output: `3`  
*Explanation: The bag is [1, 1, 1, 0, 0]. Pick three 1’s and one 0. Sum = 1+1+1+0 = 3.*

**Example 3:**  
Input: `numOnes = 2, numZeros = 1, numNegOnes = 2, k = 3`  
Output: `2`  
*Explanation: The bag is [1, 1, 0, -1, -1]. Pick both 1’s and one 0 for sum 1+1+0 = 2. Picking -1s would decrease the sum, so we avoid them if possible.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Consider all possible combinations of k picks. This is extremely slow (combinatorial explosion), not feasible.

- **Greedy approach (optimized):**  
  To maximize the sum:
  - First pick as many 1’s as possible (they add +1 each).
  - If there are picks left, choose 0’s (which add nothing, but don’t harm).
  - If still not enough, fill remaining slots with -1’s (which will reduce the sum by 1 for each extra slot).
  
  This greedy strategy always yields the max sum since 1 > 0 > -1.

- **Implementation idea:**  
  - If k ≤ numOnes: Take k ones, sum is k.
  - If k ≤ numOnes + numZeros: Take all ones, rest zeros. Sum is numOnes.
  - Otherwise: Take all ones, all zeros, and the rest are from -1s. For each -1 picked, subtract 1.


### Corner cases to consider  
- k = 0 (answer is 0, nothing is picked).
- numOnes, numZeros, or numNegOnes = 0 (no such element to pick, make sure not to access them).
- k is larger than numOnes + numZeros (have to pick -1s).
- numOnes + numZeros + numNegOnes = 0, or k = 0 (empty bag).
- All elements are -1.
- Only zeros and -1s.
- Only ones and -1s.


### Solution

```python
def kItemsWithMaximumSum(numOnes, numZeros, numNegOnes, k):
    # Step 1: Choose as many 1's as possible, up to k
    ones_picked = min(numOnes, k)
    # Update how many picks are left after taking 1's
    k -= ones_picked

    # Step 2: Choose as many 0's as possible, up to remaining k
    zeros_picked = min(numZeros, k)
    k -= zeros_picked  # No effect on sum, so can skip adding

    # Step 3: Remaining k must be spent on -1's, which decrease sum
    neg_ones_picked = k  # whatever is left (could be 0)

    # Total sum: +1 for each 1 picked, -1 for each -1 picked
    return ones_picked - neg_ones_picked
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) (all steps operate in constant time, fixed number of variables and operations).
- **Space Complexity:** O(1) (only a few integer variables used, no additional data structures).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the bag could contain arbitrary integer values, not just 1, 0, -1?  
  *Hint: How could sorting help?*

- What if you can choose less than k items, or at most k items, for the max sum?  
  *Hint: What is the impact of “at most” in the picking logic?*

- What if you need to record the actual items picked, not just the sum?  
  *Hint: Can you reconstruct a sequence based on the greedy picks?*

### Summary
This is a classic **greedy problem**: always pick the highest-value items first to maximize the sum.  
The pattern of “pick the best available up to quota, then the next best, etc.” also applies to similar problems like selecting employees or resources to maximize/minimize a result under constraints.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)