### Leetcode 974 (Medium): Subarray Sums Divisible by K [Practice](https://leetcode.com/problems/subarray-sums-divisible-by-k)

### Description  
Given an array of integers and an integer **K**, count how many **contiguous (non-empty) subarrays** in the array have a sum that is divisible by **K**. In other words, for every contiguous subarray, if the sum of its elements modulo K equals zero, we count it. The problem asks for the total count of such subarrays.

### Examples  

**Example 1:**  
Input: `A = [4,5,0,-2,-3,1], K = 5`  
Output: `7`  
*Explanation: The subarrays with sums divisible by 5 are:  
[4,5,0,-2,-3,1], [5], [5,0], [5,0,-2,-3], , [0,-2,-3], [-2,-3].*

**Example 2:**  
Input: `A = [1,2,3,4], K = 5`  
Output: `1`  
*Explanation: Only subarray is [2,3]. 2+3=5, which is divisible by 5.*

**Example 3:**  
Input: `A = [5,10,15], K = 5`  
Output: `6`  
*Explanation: Every subarray’s sum is divisible by 5:  
[5], , , [5,10], [10,15], [5,10,15].*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - For every pair of indices (start, end), calculate the sum of the subarray A[start:end+1] and check if it's divisible by K.
  - This is O(n²) because there are about n²/2 subarrays and each requires sum calculation.

- **Optimization via Prefix Sums:**  
  - Notice that sum(A[i:j]) = prefix[j] - prefix[i].  
  - A sum is divisible by K if (prefix[j] - prefix[i]) % K == 0  
  - Rearranged: prefix[j] % K == prefix[i] % K  
  - Therefore, for every equal remainder of the running prefix sum modulo K, there is a valid subarray.

- **Efficient approach:**  
  - Use a hash map to keep track of how many times each remainder appears as you traverse the array.
  - At every element, calculate running sum and its remainder.  
  - For current remainder r, if r has been seen t times before, all t subarrays ending here are valid.

- **Why this approach works:**  
  - This reduces time to O(n), since for each index we do only constant work.
  - Trade-off: We use O(K) extra space for the hashmap.

### Corner cases to consider  
- Array with only 1 element (array length = 1)
- K is larger than some/all elements
- Negative numbers in the array (take special care when calculating modulo)
- Remainder is negative: Python’s % handles negatives naturally, but make sure remainder is always in [0, K-1]
- Array of all zeros (all subarrays sum to 0, every possible subarray is counted)
- K = 1 (every subarray sum is divisible by 1)
- Empty array (should return 0, but per constraints, array will always have at least 1 element)

### Solution

```python
def subarraysDivByK(A, K):
    # Dictionary to count prefix sum remainders.
    rem_count = {0: 1}  # Initial remainder 0 is seen once (prefix sum before any elements)
    prefix_sum = 0
    result = 0

    for num in A:
        prefix_sum += num
        # Normalize remainder to always be between 0 and K-1.
        rem = prefix_sum % K
        if rem < 0:
            rem += K

        # If we've already seen this remainder, 
        # that many subarrays (ending here) are valid.
        result += rem_count.get(rem, 0)
        rem_count[rem] = rem_count.get(rem, 0) + 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of A.  
  Only a single pass and each operation in the loop is constant time.

- **Space Complexity:** O(K), as we only store up to K different possible remainders in the hashmap.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you handle input arrays with very large values of K efficiently?  
  *Hint: The hashmap always holds at most K entries (one for each remainder).*

- How does this method handle negative numbers in the input list?  
  *Hint: Carefully normalize the modulo operation to keep remainder between 0 and K-1.*

- Could you adapt this algorithm if, instead of exactly divisible, you needed the subarrays with remainder r when divided by K?  
  *Hint: Store and look up counts for any target remainder.*

### Summary
This problem uses the **prefix sum** and **hash map counting** patterns—very common in subarray count and sum-divisibility problems.  
The observation that equal prefix sum remainders imply a sum-divisible subarray is a broadly-used trick, also seen in questions like "Subarray Sum Equals K". This approach is optimal for large input arrays where brute-force would be infeasible.

### Tags
Array(#array), Hash Table(#hash-table), Prefix Sum(#prefix-sum)

### Similar Problems
- Subarray Sum Equals K(subarray-sum-equals-k) (Medium)
- Make Sum Divisible by P(make-sum-divisible-by-p) (Medium)
- Count Number of Bad Pairs(count-number-of-bad-pairs) (Medium)
- Find the Divisibility Array of a String(find-the-divisibility-array-of-a-string) (Medium)
- Count of Interesting Subarrays(count-of-interesting-subarrays) (Medium)
- Maximum Subarray Sum With Length Divisible by K(maximum-subarray-sum-with-length-divisible-by-k) (Medium)