### Leetcode 1524 (Medium): Number of Sub-arrays With Odd Sum [Practice](https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum)

### Description  
Given an integer array, count the number of **contiguous subarrays** whose sum is odd. Return the count modulo 10⁹ + 7, since the answer may be large.  
A subarray is a continuous section of the array (order preserving, no skipping elements). Elements can be positive, negative, or zero.

### Examples  

**Example 1:**  
Input: `[1, 3, 5]`  
Output: `4`  
*Explanation: All subarrays: [1], [1,3], [1,3,5], [3], [3,5], [5].  
Their sums: [1], [4], , [3], , [5].  
Odd sums: [1], , [3], [5] ⇒ 4 subarrays.*

**Example 2:**  
Input: `[2, 4, 6]`  
Output: `0`  
*Explanation: All subarray sums are [2], , , [4], , , all even. Nothing to count.*

**Example 3:**  
Input: `[1, 2, 3, 4, 5, 6, 7]`  
Output: `16`  
*Explanation: Several subarrays (not shown for brevity) result in a total of 16 odd-sum subarrays.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach: check **every possible subarray** (start and end indices) and calculate their sum, count when odd.  
- This results in O(n²) time for an array of size n, which becomes impractical for large arrays.

To optimize:  
- We need a faster way to determine odd-sum subarrays.
- Let's track **prefix sums** — for a subarray arr[i..j], its sum is prefix[j+1] - prefix[i].
- Notice: sum is odd **iff** the difference in parities (odd/even) of prefix sums at two indices is 1.

So keep count of how often we've seen even/odd prefix sums as we go:
- Let `even` = number of prefix sums (including prefix 0) which are even.
-    `odd` = number of prefix sums which are odd.
Start with even=1 (empty prefix sum is 0, which is even), odd=0.

Loop through the array, updating prefix sum:
- If the prefix sum is even at index i:
    - Any subarray ending here, started from any previous odd prefix, gives odd sum (odd subarrays ending here = odd).
- If prefix sum is odd:
    - Any subarray ending here, started from previous even prefix, gives odd sum (odd subarrays ending here = even).

At every step, add the count accordingly and update even/odd.

This yields O(n) time and O(1) space.

### Corner cases to consider  
- Empty array ⇒ output is 0.
- All elements even ⇒ output is 0 (since all subarray sums are even).
- All elements odd ⇒ maximal possible odd subarrays, based on odd/even alternation.
- Zeroes in array (they don’t affect parity).
- Negative numbers (parity rules still apply).
- Single element (odd/even).
- Large arrays (time/space efficiency).

### Solution

```python
def numOfSubarrays(arr):
    MOD = 10 ** 9 + 7
    odd = 0        # Count of prefix sums with odd sum so far
    even = 1       # Count of prefix sums with even sum so far (prefix 0)
    prefix = 0
    result = 0

    for num in arr:
        prefix += num
        if prefix % 2 == 0:
            # Subarrays ending here with odd sum = count of previous odd prefix sums
            result = (result + odd) % MOD
            even += 1
        else:
            # Subarrays ending here with odd sum = count of previous even prefix sums
            result = (result + even) % MOD
            odd += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we traverse the array once and all operations inside the loop are O(1).
- **Space Complexity:** O(1), since we only use a few integer variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the *actual subarrays*, not just their count?  
  *Hint: Brute force, or keep track of ranges meeting the criterion.*

- How would your algorithm change for a stream of numbers (coming one by one, possibly infinitely)?  
  *Hint: Maintain rolling counts; approach remains the same, as O(1) storage suffices.*

- Can this be generalized for subarrays with sums divisible by k (not just odd sums, i.e., k=2)?  
  *Hint: Track freq of prefix sums % k using a hash map; see “Subarrays with Sum Divisible by K” problem.*

### Summary
This problem uses a **prefix sum parity** counting pattern which is a form of prefix sum with classification by parity. Optimizing from brute-force to O(n) time and O(1) space is achieved by leveraging how the number of prior even/odd prefix sums determines the number of possible odd-sum subarrays ending at each position.  
This pattern applies to numerous subarray/count problems (subarrays with sum k, divisible by k, etc.) — always consider prefix statistics to optimize contiguous subarray questions.


### Flashcard
Count subarrays with an odd sum by tracking prefix sums and identifying parity changes.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
- Subsequence of Size K With the Largest Even Sum(subsequence-of-size-k-with-the-largest-even-sum) (Medium)