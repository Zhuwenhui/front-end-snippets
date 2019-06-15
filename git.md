



#####   2⃣️初始化操作[Creates a new local repository with the specified name]
```shell
git init 
```


#### 👋Make Changed

#####   1⃣️查看状态
```shell
git status 
git status -s  #clean
```
#####   3⃣️显示尚未暂存的文件差异
```shell
git diff
```
#####   4⃣️将指定的文件添加到暂存区域
```shell
git add [file] (.all files)
```

#####  5⃣️显示登台和上一个文件版本之间的文件差异
```shell
git diff --staged
```

#####  6⃣️Unstages the file, but preserve its contents
```shell
git reset [file]
```

##### 7⃣️Records staged snapshots in version history
```shell
git commit -m 'descriptive message'
Records staged and commit
git commit -a -m "descriptive message" 
```

#### 👋HISTORY AND DIFF

#####  1⃣️Lists version history for the current branch
```shell
git log 
git log --oneline 
```
#####  2⃣Lists version history for a file, including renames
```shell
git log --follow [file]
```
#####  3⃣️Shows content differences between two branches
```shell
git diff [first-branch]...[second-branch]
```
#####  4⃣️Shows changes of the specified commit
```shell
git show [commit]
```






