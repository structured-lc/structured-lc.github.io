### Leetcode 2155 (Medium): All Divisions With the Highest Score of a Binary Array [Practice](https://leetcode.com/problems/all-divisions-with-the-highest-score-of-a-binary-array)

### Description  
You are given a binary array `nums` (only 0s and 1s). You can divide it at any index `i` into two parts:  
- `nums_left = nums[0..i-1]`
- `nums_right = nums[i..n-1]`  

The **division score** at position `i` is the number of 0s in `nums_left` plus the number of 1s in `nums_right`.  
Return **all indices** where this score is maximized.  
There are `n+1` possible divisions (including before the first and after the last element).

### Examples  

**Example 1:**  
Input: `nums = [0,0,1,0]`  
Output: `[2,4]`  
*Explanation:*
- i=0: score = 0 (no left zeros) + 2 (right ones) = 2  
- i=1: score = 1 + 2 = 3  
- i=2: score = 2 + 2 = 4  
- i=3: score = 2 + 1 = 3  
- i=4: score = 3 + 0 = 3  
So, max score is 4 at i=2.

**Example 2:**  
Input: `nums = [0,0,0]`  
Output: `[3]`  
*Explanation:*
- All values are 0, so max score will be when all zeros are on the left (i=3): 3 + 0 = 3.

**Example 3:**  
Input: `nums = [1,1]`  
Output: ``  
*Explanation:*
- All values are 1, so max score is at i=0: 0 (no left zeros) + 2 (all right ones) = 2.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each possible split (i from 0 to n), count 0s in nums[0:i] and 1s in nums[i:n].  
  But this takes O(n²) time – not acceptable for n up to 100,000.
- **Optimize:**  
  Think in terms of prefix-sums:
  - Total number of 1s = totalOnes (precompute once).
  - As we iterate, keep count of 0s to the left (leftZeros) so far.
  - At index i, rightOnes = totalOnes - leftOnesSoFar.
  - Iteratively compute score = leftZeros + rightOnes at each position in O(n).
- **Why this is optimal:**  
  Only a linear scan and a few counters are required, meeting time constraints.

### Corner cases to consider  
- Array of all 0s — answer is `[n]`  
- Array of all 1s — answer is ``  
- Single element arrays (either 0 or 1)  
- Alternating zeros and ones  
- Multiple splits with same max score  
- Empty array (not possible per constraints, but worth thinking about in a real interview)

### Solution

```python
def maxScoreIndices(nums):
    n = len(nums)
    total_ones = sum(nums)   # count all 1s in input
    left_zeros = 0           # number of 0s in prefix
    left_ones = 0            # number of 1s in prefix
    max_score = total_ones   # score at split i=0
    answer = [0]             # always consider split at i=0

    # scan and simulate split after each index
    for i, num in enumerate(nums):
        if num == 0:
            left_zeros += 1
        else:
            left_ones += 1
        right_ones = total_ones - left_ones
        score = left_zeros + right_ones
        if score == max_score:
            answer.append(i+1)
        elif score > max_score:
            max_score = score
            answer = [i+1]
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We make one pass to compute total ones, and another pass to compute scores for splits.
- **Space Complexity:** O(1) extra (plus output array of size ≤ n+1). Uses just counters and the output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it for a non-binary array, e.g. with more than two types of numbers?  
  *Hint: How would you generalize the “score” definition and what extra info do you need at each split?*

- Can you compute the result in-place, modifying the original array to store any pre-computed data?  
  *Hint: Prefix sums and right-sweep trick can sometimes be fit in original storage.*

- If the array is extremely large and you cannot fit the prefix sums in memory, how would you process it?  
  *Hint: Consider streaming or buffering, only retaining the minimal statistics required.*

### Summary
This approach uses a **prefix sum/prefix sweep pattern**, tracking counts as you scan the array once. This is a frequent and efficient pattern for subarray and split-count problems, often useful for problems like maximum subarray, histogram/bar problems, or anywhere pre-computed running totals enable constant-time queries for each range or split point.


### Flashcard
Precompute total 1s, then iterate through the array, tracking left 0s and right 1s at each split to compute the score in O(n) time.

### Tags
Array(#array)

### Similar Problems
- Ones and Zeroes(ones-and-zeroes) (Medium)
- Max Consecutive Ones II(max-consecutive-ones-ii) (Medium)
- Count Subarrays With More Ones Than Zeros(count-subarrays-with-more-ones-than-zeros) (Medium)
- Array Partition(array-partition) (Easy)
- Divide Array in Sets of K Consecutive Numbers(divide-array-in-sets-of-k-consecutive-numbers) (Medium)