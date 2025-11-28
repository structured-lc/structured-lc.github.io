### Leetcode 3496 (Medium): Maximize Score After Pair Deletions [Practice](https://leetcode.com/problems/maximize-score-after-pair-deletions)

### Description  
Given an array of integers, you may repeatedly delete *a pair of numbers* using one of these operations:  
- Remove the first two elements  
- Remove the last two elements  
- Remove the first and last elements  

For each removal, add the **sum of the deleted pair** to your score. Continue until the array has only one or two elements remaining (depending on whether it started with odd or even length).  
Return the **maximum possible score** after performing the operations optimally.  
The core observation is: since you can only remove pairs from the ends, you always leave a *contiguous subarray* at the end (either one or two elements). To maximize your score (the sum of all removed elements), you want to minimize the final element (odd) or the final pair’s sum (even).

---

### Examples  

**Example 1:**  
Input: `[1, 2, 3, 4]`  
Output: `9`  
Explanation:  
- Removes can be: (1,2) → score=3; array=[3,4]; remove (3,4) → score=3+7=10  
  But that leaves nothing, so the last pair keeps their sum.  
  Best strategy: (1,4) → score=5; array=[2,3]; remove (2,3) → score=5+5=10  
  But you can only stop when two elements remain, so the maximum score is total sum (10) minus minimum sum of any consecutive pair (2+3=5), so answer is 10-5=5.    
  Corrected: For `[1,2,3,4]`,  
  All pairs:  
      (Remove 1,4)→ score=1+4=5, left: [2,3], remove (2,3): score=5+5=10  
      (Remove 1,2)→ score=1+2=3, left: [3,4], remove (3,4): score=3+7=10  
  But you always finish with two elements. The max score = sum([1,2,3,4]) - min(1+2, 2+3, 3+4) = 10-3=7.

**Example 2:**  
Input: `[5, 2, 8, 7, 4]`  
Output: `24`  
Explanation:  
- Array has odd length (5).  
  To maximize score, we want to leave the *minimum element*.  
  Sum = 5+2+8+7+4 = 26  
  Min element is 2  
  So, maximum score = 26-2=24.

**Example 3:**  
Input: `[3, 1]`  
Output: `0`  
Explanation:  
- Array has only two elements. No moves can be made; score is 0.


### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Generate all possible sequences of valid pair removals recursively, track the score for each, and return the maximum. But, with exponential (O(2ⁿ)) possibilities, this will time out except for tiny arrays.

- **Key Observation:** Only the *elements left* at the end (either single or consecutive pair) are not scored. Every other number is added to the score *once* during removals.

- So, for **odd n**, we always end up with one number. Since every other element adds to our score, to maximize, we must *minimize the unrewarded final element*.  
  For **even n**, we’re left with two elements (always contiguous due to allowed removals), so to maximize score, minimize their sum (find the lowest sum of two consecutive elements).

- **Final Formula:**  
  If n odd: `sum(nums) - min(nums)`  
  If n even: `sum(nums) - min(nums[i] + nums[i+1]) for i in 0..n-2`

- **Why this works:**  
  You can always remove pairs from ends; the choice only affects which elements are stranded at the end. Strategically, maximally scoring is equivalent to leaving the smallest final element/pair.

- **Efficiency:**  
  O(n), since we only need to sum and scan for min values.

---

### Corner cases to consider  
- Array of length 1 or 2 ⇒ no operations possible, score is 0  
- All elements are the same  
- Minimum at beginning or end  
- Large input size  
- Negative numbers  
- Already sorted/unsorted arrays  
- Mixed positive and negative numbers


### Solution

```python
def maximizeScoreAfterPairDeletions(nums):
    n = len(nums)
    # Edge case: less than 3 elements, no removals possible
    if n <= 2:
        return 0

    total = sum(nums)
    if n % 2 == 1:
        min_elem = min(nums)
        return total - min_elem
    else:
        min_pair_sum = float('inf')
        # Scan for minimal sum of adjacent pairs
        for i in range(n - 1):
            pair = nums[i] + nums[i + 1]
            if pair < min_pair_sum:
                min_pair_sum = pair
        return total - min_pair_sum
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n),  
    One pass for sum, and at most one pass for min value or min pair sum.

- **Space Complexity:** O(1),  
    Only a handful of variables; no extra data structures proportional to n.


### Potential follow-up questions (as if you’re the interviewer)  

- What if removing pairs could be from *any* two positions, not just ends?  
  *Hint: Consider DP or max-weight matching of pair removals.*

- How would you handle the case if *skipping* removals was allowed at any time?  
  *Hint: Try modifying the base case checks.*

- What if each removal *cost* something (e.g., deducted from score depending on indices used)?  
  *Hint: Consider greedy vs DP, cost modeling.*

---

### Summary
This is a classic "leave the minimum behind, maximize removed sum" greedy approach. The main logic is to minimize what is left as it is *not scored*; all other numbers are. This falls under the prefix/suffix trick/cumulative sum class of problems, where reducing to a smaller core optimal substructure leads to a linear scan solution. This pattern is found in other DP/games/arrangement problems where only end groups are affected by allowed moves.


### Flashcard
Every element except the final unpaired one contributes to the score; for odd n, one element remains; for even n, choose which pair to leave unpaired to maximize score.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
