### Leetcode 3766 (Medium): Minimum Operations to Make Binary Palindrome [Practice](https://leetcode.com/problems/minimum-operations-to-make-binary-palindrome)

### Description  
Given an array of positive integers nums, for each nums[i], find the minimum number of operations (+1 or -1 per operation) needed to convert it to a binary palindrome—a number whose binary representation (without leading zeros) reads the same forward and backward. Return an array ans where ans[i] is the answer for nums[i].

### Examples  

**Example 1:**  
Input: `nums = `  
Output: `[1]`  
*Explanation: 10 in binary is 1010 (not palindrome). Subtract 1 to get 9 (1001 → 101, palindrome). 1 operation minimum.*

**Example 2:**  
Input: `nums = [2]`  
Output: `[1]`  
*Explanation: 2 in binary is 10 (not palindrome). Add 1 to get 3 (11, palindrome) or subtract 1 to get 1 (1, palindrome). 1 operation minimum.*

**Example 3:**  
Input: `nums = [5]`  
Output: ``  
*Explanation: 5 in binary is 101 (palindrome). No operations needed.*


### Thought Process (as if you’re the interviewee)  
First, brute-force: For each num, check nearby values (e.g., num-50 to num+50) by converting to binary, stripping leading zeros, and verifying palindrome—O(n × range × log(num)) time, too slow for n=5000, num=5000.  
Then, realize binary palindromes are sparse; precompute all up to ~10000 (max reachable: 5000+5000). Generate by checking all candidates or bit-masking palindromic patterns.  
Optimal: Precompute sorted list of binary palindromes, then for each num use binary search to find closest (0 if exact match, else min diff to lower/upper neighbor)—O(n log m) where m~1000 palindromes. Trade-off: Precompute is O(max_num log max_num) but fast constant. Two-pointer/greedy won't work without list.

### Corner cases to consider  
- nums[i]=1 (binary "1", already palindrome, ans=0).  
- nums[i]=0 (but positive integers, so skip; if allowed, binary "0" palindrome?).  
- Already palindrome (e.g., 5=101, ans=0).  
- Midpoint equidistant (e.g., between two palindromes, pick min diff).  
- Max num=5000 (binary palindromes up to ~10000 suffice).  

### Solution

```python
def minimumOperationsToMakeBinaryPalindrome(nums):
    # Step 1: Precompute all binary palindromes up to 10000 (covers 5000 + max ops)
    palindromes = []
    for num in range(1, 10001):
        bin_str = bin(num)[2:]  # Binary without '0b', has no leading zeros
        if bin_str == bin_str[::-1]:  # Check palindrome
            palindromes.append(num)
    
    # Step 2: For each nums[i], binary search closest palindrome
    n = len(nums)
    ans = [0] * n
    for i in range(n):
        num = nums[i]
        # Binary search for insertion point (first >= num)
        left, right = 0, len(palindromes) - 1
        pos = -1
        while left <= right:
            mid = (left + right) // 2
            if palindromes[mid] >= num:
                pos = mid
                right = mid - 1
            else:
                left = mid + 1
        
        # Closest: exact (0 ops), upper (pos), or lower (pos-1)
        min_ops = float('inf')
        if pos < len(palindromes):
            min_ops = min(min_ops, palindromes[pos] - num)
        if pos > 0:
            min_ops = min(min_ops, num - palindromes[pos - 1])
        ans[i] = min_ops
    
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(max_num × log(max_num) + n × log(m)), where max_num=10000, m≈1000 palindromes, n=5000. Precompute dominates but fast (~10⁵ ops), per-query binary search efficient.  
- **Space Complexity:** O(m) for palindromes list (~1000 ints), plus O(n) output. No recursion/extra per query.


### Potential follow-up questions (as if you’re the interviewer)  

- (What if nums contains duplicates or large range up to 10⁹?)  
  *Hint: Use set for O(1) exact lookup post-precompute; binary search scales logarithmically.*

- (Can you generate palindromes without checking all numbers up to max?)  
  *Hint: Construct via mirroring bits (e.g., for len=3: 101, 111; scale half-length).*

- (Modify: Return the actual palindrome number chosen (any min-ops one).)  
  *Hint: Track argmin during closest calc (upper/lower), return value not diff.*

### Summary
Precompute all binary palindromes via enumeration/check, sort once, then binary search closest for each num. Classic "precompute + binary search" pattern for nearest-value queries, also applies to closest prime/special numbers.

### Flashcard
Precompute sorted binary palindromes, then binary search finds min |num - closest| ops for each nums[i] in O(n log m). Greedy nearest-neighbor via sorted list beats brute-force checking.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Bit Manipulation(#bit-manipulation)

### Similar Problems
