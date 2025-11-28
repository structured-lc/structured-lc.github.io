### Leetcode 3591 (Easy): Check if Any Element Has Prime Frequency [Practice](https://leetcode.com/problems/check-if-any-element-has-prime-frequency)

### Description  
Given an integer array, return **true** if the frequency of any element is a prime number, otherwise return **false**.  
A **prime number** is a natural number greater than 1 that has no positive divisors other than 1 and itself—i.e., 2, 3, 5, 7, etc.  
You must check the frequency (count) of every element in the array and identify if any of those counts is a prime number.

### Examples  

**Example 1:**  
Input: `[1,2,3,4,5,4]`  
Output: `true`  
Explanation:  
4 appears 2 times (frequency = 2), and 2 is a prime number.

**Example 2:**  
Input: `[1,2,3,4,5]`  
Output: `false`  
Explanation:  
Every element appears once. 1 is not prime.

**Example 3:**  
Input: `[2,2,2,4,4]`  
Output: `true`  
Explanation:  
2 appears 3 times (3 is prime), 4 appears 2 times (2 is prime).

### Thought Process (as if you’re the interviewee)  

First, I need to count the frequency of each element. Then, for each frequency, I must check if it is a prime number (>1, only divisible by 1 and itself).

**Brute-force idea:**  
- Use a hash map (dictionary) to count the frequency of each integer.
- For every frequency, use a function to check if it is prime by testing divisibility up to its square root.

**Optimization:**  
- Since frequencies are limited by the input size (at most n), I can precompute all prime numbers up to n with the Sieve of Eratosthenes and check frequencies in O(1).

**Why this approach:**  
- Counting frequencies is O(n).
- Prime checks in O(√k) for k is efficient because k is small (≤ n), but precomputing primes adds O(n log log n) but gives O(1) checks later.
- Trade-off: Hash map simplicity (works for all problems); sieve is an optimization when input range is predictable.

### Corner cases to consider  
- Empty array: No frequencies at all, so return `false`.
- Array with only one element (frequency 1, not prime).
- All elements unique (all frequencies 1, not prime).
- One element with frequency 2 or 3 (smallest primes).
- Large arrays: is the frequency ever greater than 1?
- Negative numbers or zeros (frequencies still work the same).

### Solution

```python
def check_if_any_element_has_prime_frequency(nums):
    # Helper function for prime check (returns True if n is prime)
    def is_prime(n):
        if n <= 1:
            return False
        if n == 2:
            return True
        if n % 2 == 0:
            return False
        i = 3
        while i * i <= n:
            if n % i == 0:
                return False
            i += 2
        return True

    # Step 1: Count frequency of each element
    freq = {}
    for num in nums:
        if num in freq:
            freq[num] += 1
        else:
            freq[num] = 1

    # Step 2: Check if any frequency is prime
    for count in freq.values():
        if is_prime(count):
            return True

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × √k), where n is array size (for counting), and for up to n unique elements, each prime check is O(√k) where k is frequency (≤ n). In practice, fast for all small n.
- **Space Complexity:** O(n), for hash map storing frequencies. The recursion/stack is O(1).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers could be very large or negative?  
  *Hint: Does your frequency counter handle arbitrary integers?*

- How would you optimize your solution for multiple queries on the same array?  
  *Hint: Consider caching frequency counts or prime checks.*

- What if frequencies can be up to 10⁶? Would Sieve of Eratosthenes still be feasible?  
  *Hint: Memory and initialization cost for Sieve at large range.*

### Summary
This problem uses the **hash map + prime check** coding pattern. It demonstrates basic frequency counting (hash table/dictionary) and prime number testing, common in array and counting problems. The optimization leverages precomputing primes when the range is small, a reusable trick for prime-checking-heavy problems. This approach is broadly applicable in frequency analysis and mathematical property checks in arrays.


### Flashcard
Count element frequencies, check each frequency for primality by testing divisibility up to √frequency.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Counting(#counting), Number Theory(#number-theory)

### Similar Problems
