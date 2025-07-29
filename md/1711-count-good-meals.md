### Leetcode 1711 (Medium): Count Good Meals [Practice](https://leetcode.com/problems/count-good-meals)

### Description  
Given an integer array **deliciousness**, find the number of pairs of different food items (different indices) such that the sum of their deliciousness values is a power of two (i.e., 1, 2, 4, 8, ... up to 2²¹). Items with equal deliciousness but at different positions are considered *different*. Return the total number of such pairs modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `deliciousness = [1,3,5,7,9]`  
Output: `4`  
*Explanation: Good meals are (1,3): sum=4; (1,7): sum=8; (3,5): sum=8; (7,9): sum=16. All sums are powers of two.*

**Example 2:**  
Input: `deliciousness = [1,1,1,3,3,3,7]`  
Output: `15`  
*Explanation:  
- (1,1): 3 possible pairs (since three "1"s);  
- (1,3): 3 "1"s × 3 "3"s = 9 pairs;  
- (1,7): 3 "1"s × 1 "7" = 3 pairs.*

**Example 3:**  
Input: `deliciousness = [0,2,2,2]`  
Output: `6`  
*Explanation: Possible powers of two are 2 and 4. Pairs: (0,2)×3=3, (2,2)×3=3 (pairs among the three 2's).*

### Thought Process (as if you’re the interviewee)  

Let's start with a brute-force approach:
- For every pair of indices \(i < j\), check if deliciousness[i] + deliciousness[j] is a power of two.
- There are O(n²) pairs. For n up to 1e5, that's not feasible.

Let's optimize:
- Instead of iterating all pairs, use a hash map to count occurrences seen so far.
- For each element x, check for every possible power of two (from 2⁰ to 2²¹, because 2²¹ > 2 × max deliciousness), if any y = target - x exists in our map (i.e., how many y values seen so far can pair with x to make a power of two).
- For each x, accumulate the number of such valid pairs, and add x to map after checking so you don't double count.

Trade-off:
- Time: O(n × 22) = O(n), since for each element we check at most 22 possible sums.
- Space: O(n) for hash map storing counts.

### Corner cases to consider  
- Empty array (should return 0)
- Only one element (no pairs possible)
- All elements are 0 (0+0=0 is not a power of two, so no pairs)
- Multiple same elements (should count all pairs)
- Large values near 2²⁰

### Solution

```python
def countPairs(deliciousness):
    MOD = 10**9 + 7
    from collections import defaultdict
    count = defaultdict(int)
    result = 0

    for x in deliciousness:
        # Check all powers of 2 up to 2^21
        for i in range(22):    # 2^0 to 2^21
            target = 1 << i
            complement = target - x
            # If complement is present, add the count
            result += count[complement]
        # Add current value to the map after checking
        count[x] += 1

    return result % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 22) ⇒ O(n). For each element, we check 22 possible powers of two.
- **Space Complexity:** O(n). Hash map may store up to n distinct deliciousness values.

### Potential follow-up questions (as if you’re the interviewer)  

- What if “good meals” can have more than two items?  
  *Hint: How would you count combinations whose sum is a power of two with more than two items?*

- What if the list is too large to hold entirely in memory?  
  *Hint: Can you work with data streams or chunked arrays?*

- Can this be extended to other “target sum” types (e.g., power of three, perfect square)?  
  *Hint: How would you enumerate such target sums efficiently?*

### Summary
This problem is a classic **hash map + enumeration** pattern, often used in “pair sum” problems but with a twist—matching sums to a set of dynamic (power of two) targets. This technique is common in subarray sum, 2-sum, and similar problems where you process in one pass and look up complements using a counter or map.