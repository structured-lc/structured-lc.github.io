### Leetcode 668 (Hard): Kth Smallest Number in Multiplication Table [Practice](https://leetcode.com/problems/kth-smallest-number-in-multiplication-table)

### Description  
Given two integers **m** and **n**, you are to imagine an m × n multiplication table where the value at position (i, j) is i × j (with **1-based indexing**). Your task: given a number **k**, find the kᵗʰ smallest element in this table.

You are not allowed to actually construct or sort the table directly, as m and n can be as large as 30,000, making brute-force or explicit sort infeasible.  
The challenge is to efficiently determine the kᵗʰ smallest number that appears in this virtual multiplication table.

### Examples  

**Example 1:**  
Input: `m = 3, n = 3, k = 5`  
Output: `3`  
Explanation:  
The full table:
```
1 2 3
2 4 6
3 6 9
```
Sorted values: [1, 2, 2, 3, 3, 4, 6, 6, 9] — The 5ᵗʰ smallest is 3.

**Example 2:**  
Input: `m = 2, n = 3, k = 6`  
Output: `6`  
Explanation:  
The table:
```
1 2 3
2 4 6
```
Sorted values: [1, 2, 2, 3, 4, 6] — The 6ᵗʰ smallest is 6.

**Example 3:**  
Input: `m = 4, n = 5, k = 8`  
Output: `4`  
Explanation:  
The table:
```
1 2 3 4 5
2 4 6 8 10
3 6 9 12 15
4 8 12 16 20
```
Sorted up to k: [1, 2, 2, 3, 3, 4, 4, 4, ...] — The 8ᵗʰ smallest is 4.

### Thought Process (as if you’re the interviewee)  
First, a brute-force approach would involve generating the full m × n array, flattening and sorting it, and picking the kᵗʰ element—this has O(m × n × log(m × n)) time and is infeasible for m, n≈30,000.  
Instead, notice that the table is not arbitrary: in each row i, values are i, 2i, 3i, ..., ni (all multiples of i), and the table is sorted within each row.

The key observation: **For any number x, you can count how many numbers in the table are ≤ x by summing, for each row i, how many columns j satisfy i × j ≤ x**.  
- In row i, that's ⌊x/i⌋ (capped at n), so total count = sum over i=1 to m of min(n, ⌊x/i