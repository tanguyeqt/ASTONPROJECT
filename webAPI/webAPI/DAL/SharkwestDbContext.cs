using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using webAPI.Model;

namespace webAPI.DAL
{
    public partial class SharkwestDbContext : DbContext
    {
        public SharkwestDbContext()
        {
        }

        public SharkwestDbContext(DbContextOptions<SharkwestDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<Commentary> Commentary { get; set; }
        public virtual DbSet<Difficulty> Difficulty { get; set; }
        public virtual DbSet<Grade> Grade { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<Questionnaire> Questionnaire { get; set; }
        public virtual DbSet<Rate> Rate { get; set; }
        public virtual DbSet<UsingQuestion> UsingQuestion { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            //{
            //    optionsBuilder.UseSqlServer();
            //}
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Account__AB6E6164397484A3")
                    .IsUnique();

                entity.HasIndex(e => e.Login)
                    .HasName("UQ__Account__7838F2726D28CCA0")
                    .IsUnique();

                entity.Property(e => e.Image)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");
            });

            modelBuilder.Entity<Commentary>(entity =>
            {
                entity.Property(e => e.Posted).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Seen).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.AccountNavigation)
                    .WithMany(p => p.Commentary)
                    .HasForeignKey(d => d.Account)
                    .HasConstraintName("FK__Commentar__accou__57DD0BE4");

                entity.HasOne(d => d.IdquestionNavigation)
                    .WithMany(p => p.Commentary)
                    .HasForeignKey(d => d.Idquestion)
                    .HasConstraintName("FK__Commentar__idque__59C55456");
            });

            modelBuilder.Entity<Difficulty>(entity =>
            {
                entity.HasIndex(e => e.Name)
                    .HasName("UQ__Difficul__72E12F1B74DC1C9A")
                    .IsUnique();
            });

            modelBuilder.Entity<Grade>(entity =>
            {
                entity.HasIndex(e => e.Name)
                    .HasName("UQ__Grade__72E12F1BFEAAC14E")
                    .IsUnique();
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.AccountNavigation)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.Account)
                    .HasConstraintName("FK__Question__accoun__4E53A1AA");

                entity.HasOne(d => d.DifficultyNavigation)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.Difficulty)
                    .HasConstraintName("FK__Question__diffic__4F47C5E3");

                entity.HasOne(d => d.GradeNavigation)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.Grade)
                    .HasConstraintName("FK__Question__grade__4D5F7D71");
            });

            modelBuilder.Entity<Questionnaire>(entity =>
            {
                entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Showpoints).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.AccountNavigation)
                    .WithMany(p => p.Questionnaire)
                    .HasForeignKey(d => d.Account)
                    .HasConstraintName("FK__Questionn__accou__498EEC8D");

                entity.HasOne(d => d.GradeNavigation)
                    .WithMany(p => p.Questionnaire)
                    .HasForeignKey(d => d.Grade)
                    .HasConstraintName("FK__Questionn__grade__489AC854");
            });

            modelBuilder.Entity<Rate>(entity =>
            {
                entity.HasKey(e => new { e.Idquestion, e.Idaccount });

                entity.HasOne(d => d.IdaccountNavigation)
                    .WithMany(p => p.Rate)
                    .HasForeignKey(d => d.Idaccount)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Rate__idaccount__5E8A0973");

                entity.HasOne(d => d.IdquestionNavigation)
                    .WithMany(p => p.Rate)
                    .HasForeignKey(d => d.Idquestion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Rate__idquestion__5D95E53A");
            });

            modelBuilder.Entity<UsingQuestion>(entity =>
            {
                entity.HasKey(e => new { e.Idquestionnaire, e.Idquestion });

                entity.Property(e => e.Points).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IdquestionNavigation)
                    .WithMany(p => p.UsingQuestion)
                    .HasForeignKey(d => d.Idquestion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UsingQues__idque__531856C7");

                entity.HasOne(d => d.IdquestionnaireNavigation)
                    .WithMany(p => p.UsingQuestion)
                    .HasForeignKey(d => d.Idquestionnaire)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UsingQues__idque__5224328E");
            });
        }
    }
}
